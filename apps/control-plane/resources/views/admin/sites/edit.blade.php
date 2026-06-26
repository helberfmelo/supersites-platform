@extends('layouts.admin', ['title' => 'Edit site - SuperSites Control Plane'])

@section('content')
    <section class="page-title" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Edit {{ $site->name }}</h1>
            <p class="muted">{{ $site->slug }}</p>
        </div>
    </section>

    <form class="panel form" method="POST" action="{{ route('admin.sites.update', $site) }}">
        @include('admin.sites._form')
    </form>
@endsection
