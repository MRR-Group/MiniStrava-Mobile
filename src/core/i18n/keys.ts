export const I18N = {
  auth: {
    email: "auth.email",
    password: "auth.password",
    login: {
      subtitle: "auth.login.subtitle",
      forgot: "auth.login.forgot",
      submit: "auth.login.submit",
      noAccount: "auth.login.noAccount",
      register: "auth.login.register",
    },
    register: {
      title: "auth.register.title",
      name: "auth.register.name",
      passwordHint: "auth.register.passwordHint",
      passwordConfirm: "auth.register.passwordConfirm",
      haveAccount: "auth.register.haveAccount",
      submit: "auth.register.submit",
      errors: {
        registerGeneric: "auth.register.errors.registerGeneric",
        nameRequired: "auth.register.errors.nameRequired",
        nameMin: "auth.register.errors.nameMin",
        nameMax: "auth.register.errors.nameMax",
        passwordMin: "auth.register.errors.passwordMin",
        passwordMax: "auth.register.errors.passwordMax",
        passwordConfirmRequired: "auth.register.errors.passwordConfirmRequired",
        passwordsNotMatch: "auth.register.errors.passwordsNotMatch",
      },
    },
    reset: {
      titleStep1: "auth.reset.titleStep1",
      titleStep2: "auth.reset.titleStep2",
      hintStep1: "auth.reset.hintStep1",
      codeSentTo: "auth.reset.codeSentTo",

      sendCode: "auth.reset.sendCode",
      setNewPassword: "auth.reset.setNewPassword",

      code6: "auth.reset.code6",
      passwordNew: "auth.reset.passwordNew",
      passwordConfirm: "auth.reset.passwordConfirm",
      passwordHint: "auth.reset.passwordHint",

      errors: {
        sendCodeGeneric: "auth.reset.errors.sendCodeGeneric",
        reset400: "auth.reset.errors.reset400",
        resetGeneric: "auth.reset.errors.resetGeneric",

        codeRequired: "auth.reset.errors.codeRequired",
        codeInvalid: "auth.reset.errors.codeInvalid",

        passwordMin: "auth.reset.errors.passwordMin",
        passwordMax: "auth.reset.errors.passwordMax",
        passwordConfirmRequired: "auth.reset.errors.passwordConfirmRequired",
        passwordsNotMatch: "auth.reset.errors.passwordsNotMatch",
      },
    },
    errors: {
      invalidCredentials: "auth.errors.invalidCredentials",
      loginGeneric: "auth.errors.loginGeneric",
      emailRequired: "auth.errors.emailRequired",
      emailInvalid: "auth.errors.emailInvalid",
      passwordRequired: "auth.errors.passwordRequired",
    },
  },
  common: {
    back: "common.back",
    backToLogin: "common.backToLogin",
    resendCode: "common.resendCode",
    loading: "common.loading",
  },
} as const;

type LeafValues<T> =
  T extends string ? T
  : T extends Record<string, any> ? LeafValues<T[keyof T]>
  : never;

export type I18nKey = LeafValues<typeof I18N>;