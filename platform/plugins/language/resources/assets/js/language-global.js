class LanguageGlobalManagement {
    init() {
        let languageChoiceSelect = $('#post_lang_choice')
        languageChoiceSelect.data('prev', languageChoiceSelect.val())

        $(document).on('change', '#post_lang_choice', (event) => {
            $('.change_to_language_text').text($(event.currentTarget).find('option:selected').text())
            $('#confirm-change-language-modal').modal('show')
        })

        $(document).on('click', '#confirm-change-language-modal .btn-warning.float-start', (event) => {
            event.preventDefault()
            languageChoiceSelect = $('#post_lang_choice')
            languageChoiceSelect.val(languageChoiceSelect.data('prev')).trigger('change')
            $('#confirm-change-language-modal').modal('hide')
        })

        $(document).on('click', '#confirm-change-language-button', (event) => {
            event.preventDefault()
            let _self = $(event.currentTarget)
            let flagPath = $('#language_flag_path').val()

            _self.addClass('button-loading')
            languageChoiceSelect = $('#post_lang_choice')

            $httpClient
                .make()
                .post($('div[data-change-language-route]').data('change-language-route'), {
                    lang_meta_current_language: languageChoiceSelect.val(),
                    reference_id: $('#reference_id').val(),
                    reference_type: $('#reference_type').val(),
                    lang_meta_created_from: $('#lang_meta_created_from').val(),
                })
                .then(({ data }) => {
                    $('.active-language').html(
                        '<img src="' +
                            flagPath +
                            languageChoiceSelect.find('option:selected').data('flag') +
                            '.svg" width="16" title="' +
                            languageChoiceSelect.find('option:selected').text() +
                            '" alt="' +
                            languageChoiceSelect.find('option:selected').text() +
                            '" />'
                    )
                    if (!data.error) {
                        $('.current_language_text').text(languageChoiceSelect.find('option:selected').text())
                        let html = ''
                        $.each(data.data, (index, el) => {
                            html +=
                                '<img src="' +
                                flagPath +
                                el.lang_flag +
                                '.svg" width="16" title="' +
                                el.lang_name +
                                '" alt="' +
                                el.lang_name +
                                '">'
                            if (el.reference_id) {
                                html +=
                                    '<a href="' +
                                    $('#route_edit').val() +
                                    '"> ' +
                                    el.lang_name +
                                    ' <i class="fa fa-edit"></i> </a><br />'
                            } else {
                                html +=
                                    '<a href="' +
                                    $('#route_create').val() +
                                    '?ref_from=' +
                                    $('#content_id').val() +
                                    '&ref_lang=' +
                                    index +
                                    '"> ' +
                                    el.lang_name +
                                    ' <i class="fa fa-plus"></i> </a><br />'
                            }
                        })

                        $('#list-others-language').html(html)
                        $('#confirm-change-language-modal').modal('hide')
                        languageChoiceSelect.data('prev', languageChoiceSelect.val()).trigger('change')
                    }
                })
                .finally(() => _self.removeClass('button-loading'))
        })

        $(document).on('click', '.change-data-language-item', (event) => {
            event.preventDefault()
            window.location.href = $(event.currentTarget).find('span[data-href]').data('href')
        })
    }
}

$(document).ready(() => {
    new LanguageGlobalManagement().init()

    $httpClient.setup(function (request) {
        request.axios.interceptors.request.use(function (config) {
            const refFrom = $('meta[name="ref_from"]').attr('content')
            const refLang = $('meta[name="ref_lang"]').attr('content')

            if (!refFrom && !refLang) {
                return config
            }

            if (config.data instanceof FormData) {
                config.data.set('ref_from', refFrom)
                config.data.set('ref_lang', refLang)
            } else if (typeof config.data === 'object') {
                config.data.ref_from = refFrom
                config.data.ref_lang = refLang
            }

            return config
        })
    })
})
