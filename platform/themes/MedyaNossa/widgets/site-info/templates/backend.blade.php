<div class="form-group">
    <label>{{ trans('core/base::forms.name') }}</label>
    <input
        class="form-control"
        name="name"
        type="text"
        value="{{ $config['name'] }}"
    >
</div>

<div class="form-group">
    <label>{{ trans('core/base::forms.description') }}</label>
    <textarea
        class="form-control"
        name="about"
        rows="3"
    >{{ $config['about'] }}</textarea>
</div>

<div class="form-group">
    <label>{{ __('Address') }}</label>
    <input
        class="form-control"
        name="address"
        type="text"
        value="{{ $config['address'] }}"
    >
</div>

<div class="form-group">
    <label>{{ __('Phone') }}</label>
    <input
        class="form-control"
        name="phone"
        type="text"
        value="{{ $config['phone'] }}"
    >
</div>

<div class="form-group">
    <label>{{ __('Email') }}</label>
    <input
        class="form-control"
        name="email"
        type="email"
        value="{{ $config['email'] }}"
    >
</div>

<div class="form-group">
    <label>{{ __('Working time') }}</label>
    <input
        class="form-control"
        name="working_time"
        type="text"
        value="{{ $config['working_time'] }}"
    >
</div>
