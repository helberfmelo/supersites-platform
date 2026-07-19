@extends('layouts.admin', ['title' => 'Edit service order - SuperSites Control Plane'])
@section('content')
<section class="page-title"><div><h1>Edit {{ $order->reference }}</h1><p class="muted">Update the manual operational record without activating checkout.</p></div></section>
<form class="panel form" method="POST" action="{{ route('admin.monetization.orders.update', $order) }}">@include('admin.monetization.orders._form')</form>
@endsection
