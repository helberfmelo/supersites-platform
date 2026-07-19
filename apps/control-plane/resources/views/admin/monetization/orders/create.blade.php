@extends('layouts.admin', ['title' => 'Add service order - SuperSites Control Plane'])
@section('content')
<section class="page-title"><div><h1>Add service order</h1><p class="muted">Manual operational record only; no checkout is created.</p></div></section>
<form class="panel form" method="POST" action="{{ route('admin.monetization.orders.store') }}">@include('admin.monetization.orders._form')</form>
@endsection
