@extends('layouts.admin', ['title' => 'Add site - SuperSites Control Plane'])

@section('content')
    <section class="page-title" aria-labelledby="page-title">
        <div>
            <h1 id="page-title">Add site</h1>
            <p class="muted">Create a portfolio record for a new app or operational surface.</p>
        </div>
    </section>

    <form class="panel form" method="POST" action="{{ route('admin.sites.store') }}">
        @include('admin.sites._form')
    </form>
@endsection
