@csrf

@if ($site->exists)
    @method('PUT')
@endif

<div class="two-column">
    <div class="field">
        <label for="name">Name</label>
        <input id="name" name="name" value="{{ old('name', $site->name) }}" required>
        @error('name')<span class="error">{{ $message }}</span>@enderror
    </div>

    <div class="field">
        <label for="slug">Slug</label>
        <input id="slug" name="slug" value="{{ old('slug', $site->slug) }}" required>
        @error('slug')<span class="error">{{ $message }}</span>@enderror
    </div>
</div>

<div class="two-column">
    <div class="field">
        <label for="kind">Kind</label>
        <input id="kind" name="kind" value="{{ old('kind', $site->kind) }}" required>
        @error('kind')<span class="error">{{ $message }}</span>@enderror
    </div>

    <div class="field">
        <label for="category">Category</label>
        <input id="category" name="category" value="{{ old('category', $site->category) }}">
        @error('category')<span class="error">{{ $message }}</span>@enderror
    </div>
</div>

<div class="two-column">
    <div class="field">
        <label for="launch_order">Launch order</label>
        <input id="launch_order" name="launch_order" type="number" min="0" max="999" value="{{ old('launch_order', $site->launch_order) }}">
        @error('launch_order')<span class="error">{{ $message }}</span>@enderror
    </div>

    <div class="field">
        <label for="status">Status</label>
        <select id="status" name="status" required>
            @foreach ($statuses as $status)
                <option value="{{ $status }}" @selected(old('status', $site->status) === $status)>{{ $status }}</option>
            @endforeach
        </select>
        @error('status')<span class="error">{{ $message }}</span>@enderror
    </div>
</div>

<div class="field">
    <label for="temporary_url">Temporary URL</label>
    <input id="temporary_url" name="temporary_url" type="url" value="{{ old('temporary_url', $site->temporary_url) }}">
    @error('temporary_url')<span class="error">{{ $message }}</span>@enderror
</div>

<div class="field">
    <label for="locales">Locales</label>
    <input id="locales" name="locales" value="{{ old('locales', implode(', ', $site->locales ?? [])) }}" required>
    @error('locales')<span class="error">{{ $message }}</span>@enderror
</div>

<label class="actions">
    <input name="adsense_ready" type="checkbox" value="1" @checked(old('adsense_ready', $site->adsense_ready))>
    AdSense ready
</label>

<div class="actions">
    <button class="button primary" type="submit">Save site</button>
    <a class="button" href="{{ route('admin.sites.index') }}">Cancel</a>
</div>
