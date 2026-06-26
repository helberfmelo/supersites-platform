<?php

namespace App\Mail;

use App\Models\NetProbeAlert;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NetProbeMonitorAlertMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public readonly NetProbeAlert $alert)
    {
    }

    public function envelope(): Envelope
    {
        $monitor = $this->alert->monitor()->first();
        $label = $monitor?->label ?: $monitor?->target ?: 'NetProbe monitor';

        return new Envelope(
            subject: '[NetProbe] '.$this->alert->severity.' alert for '.$label,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.netprobe-monitor-alert',
        );
    }
}
