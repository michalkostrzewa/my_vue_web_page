import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from "vee-validate";
import { required, min, max, alpha_spaces, email, min_value, max_value, confirmed } from '@vee-validate/rules'

export default {
    install(app) {
        app.component('VeeForm', VeeForm)
        app.component('VeeField', VeeField)
        app.component('ErrorMessage', ErrorMessage)

        defineRule('required', required)
        defineRule('tos', required)
        defineRule('min', min)
        defineRule('max', max)
        defineRule('alpha_spaces', alpha_spaces)
        defineRule('email', email)
        defineRule('min_value', min_value)
        defineRule('max_value', max_value)
        defineRule('passwords_mismatch', confirmed)

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `The field ${ctx.field} is required.`,
                    tos: 'You must accept thr Terms of Service',
                    min: `The field ${ctx.field} is too short.`,
                    max: `The field ${ctx.field} is too long`,
                    alpha_spaces: `The field ${ctx.field} may only contain alphabetic characters and spaces.`,
                    email: `The field ${ctx.field} must be a valid email. `,
                    min_value: `The field ${ctx.field} is too low.`,
                    max_value: `The field ${ctx.field} is too high.`,
                    passwords_mismatch: `The passwords don't match.`,
                };

                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`;

                return message;
            },
            validateOnBlur: true,
            validateOnChange: true,
            validateOnInput: false,
            validateOnModelUpdate: true,
        })
    },
};