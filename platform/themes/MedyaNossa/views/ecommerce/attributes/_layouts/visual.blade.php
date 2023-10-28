<div
    class="visual-swatches-wrapper attribute-swatches-wrapper form-group product__attribute product__color"
    data-type="visual"
    data-slug="{{ $set->slug }}"
>
    <label class="attribute-name">{{ $set->title }}</label>
    <div class="attribute-values">
        <ul class="visual-swatch color-swatch attribute-swatch">
            @foreach ($attributes->where('attribute_set_id', $set->id) as $attribute)
                <li
                    data-slug="{{ $attribute->slug }}"
                    data-id="{{ $attribute->id }}"
                    title="{{ $attribute->title }}"
                    @class([
                        'attribute-swatch-item',
                        'pe-none' => !$variationInfo->where('id', $attribute->id)->count(),
                    ])
                >
                    <div class="custom-radio">
                        <label>
                            <input
                                class="form-control product-filter-item"
                                name="attribute_{{ $set->slug }}_{{ $key }}"
                                data-slug="{{ $attribute->slug }}"
                                type="radio"
                                value="{{ $attribute->id }}"
                                @checked($selected->where('id', $attribute->id)->count())
                            >
                            <span style="{{ $attribute->getAttributeStyle($set, $productVariations) }}"></span>
                        </label>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>
</div>