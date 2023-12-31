@props(['name', 'label' => null, 'helperText' => null, 'options' => [], 'value' => null])

<x-core-setting::form-group>
    @if ($label)
        <label
            class="text-title-field"
            for="{{ $name }}"
        >{{ $label }}</label>
    @endif

    {!! Form::customSelect($name, $options, $value, $attributes->getAttributes()) !!}

    @if ($helperText)
        {{ Form::helper($helperText) }}
    @endif
</x-core-setting::form-group>
