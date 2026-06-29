param(
    [string]$Owner = "helberfmelo",
    [string]$Repository = "supersites-platform",
    [string]$RulesetName = "SuperSites main safety guardrails",
    [ValidateSet("active", "evaluate", "disabled")]
    [string]$Enforcement = "active",
    [switch]$Apply
)

$ErrorActionPreference = "Stop"

function Invoke-GhJson {
    param(
        [string[]]$Arguments,
        [object]$Payload = $null
    )

    if ($null -eq $Payload) {
        $output = & gh @Arguments
    }
    else {
        $json = $Payload | ConvertTo-Json -Depth 20
        $output = $json | & gh @Arguments --input -
    }

    if ($LASTEXITCODE -ne 0) {
        throw "gh command failed: gh $($Arguments -join ' ')"
    }

    if (-not $output) {
        return $null
    }

    return $output | ConvertFrom-Json
}

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw "GitHub CLI (gh) is required."
}

$repoPath = "repos/$Owner/$Repository"
$rulesets = @(Invoke-GhJson -Arguments @("api", "$repoPath/rulesets"))
$existing = $rulesets | Where-Object { $_.name -eq $RulesetName } | Select-Object -First 1

$payload = [ordered]@{
    name = $RulesetName
    target = "branch"
    enforcement = $Enforcement
    conditions = [ordered]@{
        ref_name = [ordered]@{
            include = @("~DEFAULT_BRANCH")
            exclude = @()
        }
    }
    rules = @(
        [ordered]@{ type = "deletion" },
        [ordered]@{ type = "non_fast_forward" }
    )
}

if (-not $Apply) {
    $mode = if ($existing) { "update" } else { "create" }
    $plan = [ordered]@{
        mode = "dry-run"
        repository = "$Owner/$Repository"
        operation = $mode
        existingRulesetId = if ($existing) { $existing.id } else { $null }
        payload = $payload
        notes = @(
            "No GitHub state was changed because -Apply was not provided.",
            "The active rule set blocks branch deletion and non-fast-forward pushes only.",
            "It does not require pull requests and does not block normal recovery pushes after CI failures."
        )
    }

    $plan | ConvertTo-Json -Depth 20
    exit 0
}

if ($existing) {
    $result = Invoke-GhJson -Arguments @("api", "--method", "PUT", "$repoPath/rulesets/$($existing.id)") -Payload $payload
}
else {
    $result = Invoke-GhJson -Arguments @("api", "--method", "POST", "$repoPath/rulesets") -Payload $payload
}

$verification = Invoke-GhJson -Arguments @("api", "$repoPath/rulesets/$($result.id)")

if ($verification.name -ne $RulesetName) {
    throw "Ruleset verification failed: unexpected ruleset name."
}

if ($verification.enforcement -ne $Enforcement) {
    throw "Ruleset verification failed: expected enforcement '$Enforcement', got '$($verification.enforcement)'."
}

$ruleTypes = @($verification.rules | ForEach-Object { $_.type })
foreach ($requiredRule in @("deletion", "non_fast_forward")) {
    if ($ruleTypes -notcontains $requiredRule) {
        throw "Ruleset verification failed: missing rule '$requiredRule'."
    }
}

[ordered]@{
    mode = "applied"
    repository = "$Owner/$Repository"
    rulesetId = $verification.id
    rulesetName = $verification.name
    enforcement = $verification.enforcement
    rules = $ruleTypes
    bypassActors = @($verification.bypass_actors).Count
} | ConvertTo-Json -Depth 8
