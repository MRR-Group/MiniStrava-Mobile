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
  record: {
    title: "record.title",
    notification: "record.notification",
    types: {
      run: "record.types.run",
      bike: "record.types.bike",
      walk: "record.types.walk",
      other: "record.types.other",
    },
    stats: {
      time: "record.stats.time",
      distance: "record.stats.distance",
      pace: "record.stats.pace",
    },
    mapPlaceholder: "record.mapPlaceholder",
    start: "record.start",
    stop: "record.stop",
    manual: "record.manual",
    confirm: {
      exitTitle: "record.confirm.exitTitle",
      exitDesc: "record.confirm.exitDesc",
      exitConfirm: "record.confirm.exitConfirm",
      exitCancel: "record.confirm.exitCancel",

      discardTitle: "record.confirm.discardTitle",
      discardDesc: "record.confirm.discardDesc",
      discardConfirm: "record.confirm.discardConfirm",
      discardCancel: "record.confirm.discardCancel",
    },
    actions: {
      start: "Start",
      stop: "Stop",
      resume: "Resume",
      save: "Save",
      discard: "Discard",
      manual: "Add activity",
      back: "Back",
    },
    save: {
      title: "record.save.title",
      
      photo: {
        label: "record.save.photo.label",
        add: "record.save.photo.add",
        change: "record.save.photo.change",
        remove: "record.save.photo.remove",
        permission: "record.save.photo.permission",
      },

      fields: {
        title: "record.save.fields.title",
        notes: "record.save.fields.notes",
        titlePlaceholder: "record.save.fields.titlePlaceholder",
        notesPlaceholder: "record.save.fields.notesPlaceholder",
          distance: "record.save.fields.distance",
          duration: "record.save.fields.duration",
          date: "record.save.fields.date",
          time: "record.save.fields.time",
      },

        errors: {
          titleRequired: "record.save.errors.titleRequired",
          titleMin: "record.save.errors.titleMin",
          titleMax: "record.save.errors.titleMax",
          distanceRequired: "record.save.errors.distanceRequired",
           distanceMin: "record.save.errors.distanceMin",
          durationRequired: "record.save.errors.durationRequired",
          dateRequired: "record.save.errors.dateRequired",
          timeRequired: "record.save.errors.timeRequired",
        },

      actions: {
        save: "record.save.actions.save",
        back: "record.save.actions.back",
        discard: "record.save.actions.discard",
      },

      confirm: {
        leaveTitle: "record.save.confirm.leaveTitle",
        leaveDesc: "record.save.confirm.leaveDesc",
        leaveConfirm: "record.save.confirm.leaveConfirm",
        leaveCancel: "record.save.confirm.leaveCancel",

        discardTitle: "record.save.confirm.discardTitle",
        discardDesc: "record.save.confirm.discardDesc",
        discardConfirm: "record.save.confirm.discardConfirm",
        discardCancel: "record.save.confirm.discardCancel",
      },
    },
  },
  profile: {
    title: "profile.title",
    greeting: "profile.greeting",
    memberSince: "profile.memberSince",
    lastActivity: "profile.lastActivity",
    placeholders: {
      noActivity: "profile.placeholders.noActivity",
    },
    metrics: {
      activities: "profile.metrics.activities",
      distance: "profile.metrics.distance",
      time: "profile.metrics.time",
      pace: "profile.metrics.pace",
      speed: "profile.metrics.speed",
    },
    details: {
      email: "profile.details.email",
      name: "profile.details.name",
      height: "profile.details.height",
      weight: "profile.details.weight",
      birth: "profile.details.birth",
    },
    language: {
      title: "profile.language.title",
      options: {
        pl: "profile.language.options.pl",
        en: "profile.language.options.en",
      },
    },
    edit: {
      title: "profile.edit.title",
      offline: "profile.edit.offline",
      fields: {
        firstName: "profile.edit.fields.firstName",
        lastName: "profile.edit.fields.lastName",
      },
      actions: {
        save: "profile.edit.actions.save",
        cancel: "profile.edit.actions.cancel",
      },
      errors: {
        updateFailed: "profile.edit.errors.updateFailed",
      },
    },
    export: {
      title: "profile.export.title",
      cta: "profile.export.cta",
      success: "profile.export.success",
      error: "profile.export.error",
    },
    actions: {
      logout: "profile.actions.logout",
      refresh: "profile.actions.refresh",
    },
  },
  activities: {
    title: "activities.title",
    listEmpty: "activities.listEmpty",
    status: {
      synced: "activities.status.synced",
      local: "activities.status.local",
    },
    actions: {
      sync: "activities.actions.sync",
      syncing: "activities.actions.syncing",
    },
    leaderboard: {
      title: "activities.leaderboard.title",
      refresh: "activities.leaderboard.refresh",
      you: "activities.leaderboard.you",
      yourPosition: "activities.leaderboard.yourPosition",
      distanceThisWeek: "activities.leaderboard.distanceThisWeek",
      empty: "activities.leaderboard.empty",
    },
    filters: {
      type: "activities.filters.type",
      date: "activities.filters.date",
      sort: "activities.filters.sort",
      typeAll: "activities.filters.typeAll",
      typeRun: "activities.filters.typeRun",
      typeRide: "activities.filters.typeRide",
      typeWalk: "activities.filters.typeWalk",
      typeOther: "activities.filters.typeOther",
      dateAll: "activities.filters.dateAll",
      date7d: "activities.filters.date7d",
      date30d: "activities.filters.date30d",
      sortDateDesc: "activities.filters.sortDateDesc",
      sortDateAsc: "activities.filters.sortDateAsc",
      sortDistanceDesc: "activities.filters.sortDistanceDesc",
      sortDistanceAsc: "activities.filters.sortDistanceAsc",
    },
    fields: {
      distance: "activities.fields.distance",
      duration: "activities.fields.duration",
      date: "activities.fields.date",
    },
    detail: {
      title: "activities.detail.title",
      back: "activities.detail.back",
      notFound: "activities.detail.notFound",
      edit: "activities.detail.edit",
      delete: "activities.detail.delete",
      deleting: "activities.detail.deleting",
      pace: "activities.detail.pace",
      aiSummary: {
        title: "activities.detail.aiSummary.title",
        cta: "activities.detail.aiSummary.cta",
        loading: "activities.detail.aiSummary.loading",
        premiumRequired: "activities.detail.aiSummary.premiumRequired",
        error: "activities.detail.aiSummary.error",
      },
      confirm: {
        deleteTitle: "activities.detail.confirm.deleteTitle",
        deleteDesc: "activities.detail.confirm.deleteDesc",
        deleteConfirm: "activities.detail.confirm.deleteConfirm",
        deleteCancel: "activities.detail.confirm.deleteCancel",
      },
    },
    edit: {
      title: "activities.edit.title",
      actions: {
        save: "activities.edit.actions.save",
        saving: "activities.edit.actions.saving",
        cancel: "activities.edit.actions.cancel",
      },
    },
  },
  common: {
    back: "common.back",
    backToLogin: "common.backToLogin",
    resendCode: "common.resendCode",
    loading: "common.loading",
    offline: "common.offline",  
  },
} as const;

type LeafValues<T> =
  T extends string ? T
  : T extends Record<string, any> ? LeafValues<T[keyof T]>
  : never;

export type I18nKey = LeafValues<typeof I18N>;