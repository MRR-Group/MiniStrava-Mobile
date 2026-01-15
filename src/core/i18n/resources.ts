export const resources = {
  pl: {
    translation: {
      common: {
        back: "Powrót",
        backToLogin: "Powrót do logowania",
        resendCode: "Wyślij kod ponownie",
        loading: "Ładowanie"
      },
      record: {
        title: "Dzisiejszy trening",
        types: { run: "Bieg", bike: "Rower", walk: "Spacer", other: "Inna" },
        stats: { time: "Czas", distance: "Dystans", pace: "Tempo" },
        mapPlaceholder: "[ podgląd trasy / mapa GPS ]",
        notification: "Śledzenie trasy",

        actions: {
          start: "Start",
          stop: "Stop",
          resume: "Wznów",
          save: "Zapisz",
          discard: "Porzuć",
          manual: "Wprowadź aktywność",
          back: "Wróć",
        },

        confirm: {
          exitTitle: "Wyjść bez zapisu?",
          exitDesc: "Niezapisana aktywność zostanie utracona.",
          exitConfirm: "Wyjdź",
          exitCancel: "Zostań",

          discardTitle: "Porzucić aktywność?",
          discardDesc: "Aktywność nie zostanie zapisana.",
          discardConfirm: "Porzuć",
          discardCancel: "Anuluj",
        },
        save: {
          title: "Zapisz aktywność",

          fields: {
            title: "Nazwa",
            notes: "Notatka",
            titlePlaceholder: "np. Poranny bieg",
            notesPlaceholder: "Opcjonalnie...",
            distance: "Dystans (km)",
            duration: "Czas (minuty)",
            date: "Data",
            time: "Godzina",
          },

          errors: {
            titleRequired: "Pole nie może być puste",
            titleMin: "Za krótki tytuł",
            titleMax: "Za długi tytuł",
            distanceRequired: "Podaj dystans",
            distanceMin: "Minimalny dystans to 0.001 km (1 m)",
            durationRequired: "Podaj czas trwania",
            dateRequired: "Podaj datę",
            timeRequired: "Podaj godzinę",
          },

          actions: {
            save: "Zapisz",
            back: "Wróć",
            discard: "Porzuć",
          },

          photo: {
            label: "Zdjęcie",
            add: "Dodaj zdjęcie",
            change: "Zmień zdjęcie",
            remove: "Usuń",
            permission: "Brak dostępu do galerii.",
          },

          confirm: {
            leaveTitle: "Wyjść bez zapisu?",
            leaveDesc: "Wpisane dane zostaną utracone.",
            leaveConfirm: "Wyjdź",
            leaveCancel: "Zostań",

            discardTitle: "Porzucić aktywność?",
            discardDesc: "Aktywność nie zostanie zapisana.",
            discardConfirm: "Porzuć",
            discardCancel: "Anuluj",
          },
        },
      },
      profile: {
        title: "Twój profil",
        greeting: "Cześć",
        memberSince: "Z nami od",
        lastActivity: "Ostatnia aktywność",
        placeholders: { noActivity: "Brak zapisanych aktywności" },
        metrics: {
          activities: "Aktywności",
          distance: "Łączny dystans",
          time: "Czas w ruchu",
          pace: "Śr. tempo",
        },
        details: {
          email: "E-mail",
          name: "Imię i nazwisko",
          height: "Wzrost",
          weight: "Waga",
          birth: "Data urodzenia",
        },
        actions: {
          logout: "Wyloguj się",
          refresh: "Odśwież",
        },
      },
      activities: {
        title: "Aktywności",
        listEmpty: "Brak aktywności",
        status: {
          synced: "Zsynchronizowana",
          local: "Lokalnie (oczekuje na sync)",
        },
        actions: {
          sync: "Synchronizuj",
          syncing: "Synchronizuję...",
        },
        filters: {
          type: "Typ",
          date: "Zakres dat",
          sort: "Sortuj",
          typeAll: "Wszystkie",
          typeRun: "Bieg",
          typeRide: "Rower",
          typeWalk: "Spacer",
          typeOther: "Inne",
          dateAll: "Wszystko",
          date7d: "Ostatnie 7 dni",
          date30d: "Ostatnie 30 dni",
          sortDateDesc: "Najnowsze",
          sortDateAsc: "Najstarsze",
          sortDistanceDesc: "Dystans ↓",
          sortDistanceAsc: "Dystans ↑",
        },
        fields: {
          distance: "Dystans",
          duration: "Czas",
          date: "Data",
        },
        detail: {
          title: "Szczegóły aktywności",
          back: "Powrót",
          notFound: "Nie znaleziono aktywności",
          edit: "Edytuj",
          delete: "Usuń",
          deleting: "Usuwam...",
          pace: "Tempo",
          confirm: {
            deleteTitle: "Usunąć aktywność?",
            deleteDesc: "Tej operacji nie można cofnąć.",
            deleteConfirm: "Usuń",
            deleteCancel: "Anuluj",
          },
        },
        edit: {
          title: "Edytuj aktywność",
          actions: {
            save: "Zapisz zmiany",
            saving: "Zapisywanie...",
            cancel: "Anuluj",
          },
        },
      },
      auth: {
        email: "E-mail",
        password: "Hasło",
        login: {
          subtitle: "Witaj ponownie! Zaloguj się, aby kontynuować.",
          forgot: "Nie pamiętasz hasła?",
          submit: "Zaloguj",
          noAccount: "Nie masz konta?",
          register: "Zarejestruj się",
        },
        register: {
          title: "Rejestracja",
          name: "Nazwa",
          passwordHint: "Min. 8 znaków",
          passwordConfirm: "Powtórz hasło",
          haveAccount: "Masz już konto?",
          submit: "Utwórz konto",
          errors: {
            registerGeneric: "Nie udało się utworzyć konta. Sprawdź dane i spróbuj ponownie.",
            nameRequired: "Nazwa jest wymagana",
            nameMin: "Nazwa musi mieć co najmniej 2 znaki",
            nameMax: "Nazwa może mieć maksymalnie 255 znaków",
            passwordMin: "Hasło musi mieć co najmniej 8 znaków",
            passwordMax: "Hasło może mieć maksymalnie 255 znaków",
            passwordConfirmRequired: "Powtórzenie hasła jest wymagane",
            passwordsNotMatch: "Hasła nie są takie same",
          },
        },
        reset: {
          titleStep1: "Reset hasła",
          titleStep2: "Ustaw nowe hasło",
          hintStep1: "Podaj e-mail, aby otrzymać 6-cyfrowy kod do zmiany hasła.",
          codeSentTo: "Kod został wysłany na:",

          sendCode: "Wyślij kod",
          setNewPassword: "Ustaw nowe hasło",

          code6: "Kod (6 cyfr)",
          passwordNew: "Nowe hasło",
          passwordConfirm: "Powtórz hasło",
          passwordHint: "Min. 8 znaków",

          errors: {
            sendCodeGeneric: "Nie udało się wysłać kodu. Spróbuj ponownie.",
            reset400: "Nieprawidłowy kod. Wygeneruj nowy kod.",
            resetGeneric: "Nie udało się zresetować hasła. Spróbuj ponownie.",

            codeRequired: "Kod jest wymagany",
            codeInvalid: "Kod musi mieć 6 cyfr",

            passwordMin: "Hasło musi mieć co najmniej 8 znaków",
            passwordMax: "Hasło może mieć maksymalnie 255 znaków",
            passwordConfirmRequired: "Powtórzenie hasła jest wymagane",
            passwordsNotMatch: "Hasła nie są takie same",
          },
        },
        errors: {
          invalidCredentials: "Nieprawidłowy e-mail lub hasło",
          loginGeneric: "Nie udało się zalogować. Spróbuj ponownie.",
          emailRequired: "E-mail jest wymagany",
          emailInvalid: "Podaj poprawny adres e-mail",
          passwordRequired: "Hasło jest wymagane",
        },
      },
    },
  },
  en: {
    translation: {
      common: {
        back: "Back",
        backToLogin: "Back to login",
        resendCode: "Resend code",
        loading: "Loading"
      },
      record: {
        title: "Today's workout",
        notification: "Recording activity",
        types: { run: "Run", bike: "Bike", walk: "Walk", other: "Other" },
        stats: { time: "Time", distance: "Distance", pace: "Pace" },
        mapPlaceholder: "[ route preview / GPS map ]",

        actions: {
          start: "Start",
          stop: "Stop",
          resume: "Resume",
          save: "Save",
          discard: "Discard",
          manual: "Add activity",
          back: "Back",
        },

        confirm: {
          exitTitle: "Leave without saving?",
          exitDesc: "Your unsaved activity will be lost.",
          exitConfirm: "Leave",
          exitCancel: "Stay",

          discardTitle: "Discard activity?",
          discardDesc: "This activity will not be saved.",
          discardConfirm: "Discard",
          discardCancel: "Cancel",
        },
        save: {
          title: "Save activity",

          fields: {
            title: "Title",
            notes: "Notes",
            titlePlaceholder: "e.g. Morning run",
            notesPlaceholder: "Optional...",
            distance: "Distance (km)",
            duration: "Duration (minutes)",
            date: "Date",
            time: "Time",
          },

          errors: {
            titleRequired: "Field cannot be empty",
            titleMin: "Too short",
            titleMax: "Too long",
            distanceRequired: "Distance is required",
            distanceMin: "Minimum distance is 0.001 km (1 m)",
            durationRequired: "Duration is required",
            dateRequired: "Date is required",
            timeRequired: "Time is required",
          },

          photo: {
            label: "Photo",
            add: "Add photo",
            change: "Change photo",
            remove: "Remove",
            permission: "No access to photo library.",
          },

          actions: {
            save: "Save",
            back: "Back",
            discard: "Discard",
          },

          confirm: {
            leaveTitle: "Leave without saving?",
            leaveDesc: "Entered data will be lost.",
            leaveConfirm: "Leave",
            leaveCancel: "Stay",

            discardTitle: "Discard activity?",
            discardDesc: "This activity will not be saved.",
            discardConfirm: "Discard",
            discardCancel: "Cancel",
          },
        },
      },
      profile: {
        title: "Your profile",
        greeting: "Hey",
        memberSince: "Member since",
        lastActivity: "Last activity",
        placeholders: { noActivity: "No activities yet" },
        metrics: {
          activities: "Activities",
          distance: "Total distance",
          time: "Moving time",
          pace: "Avg pace",
        },
        details: {
          email: "Email",
          name: "Full name",
          height: "Height",
          weight: "Weight",
          birth: "Birth date",
        },
        actions: {
          logout: "Sign out",
          refresh: "Refresh",
        },
      },
      activities: {
        title: "Activities",
        listEmpty: "No activities yet",
        status: {
          synced: "Synced",
          local: "Local (pending sync)",
        },
        actions: {
          sync: "Sync",
          syncing: "Syncing...",
        },
        filters: {
          type: "Type",
          date: "Date range",
          sort: "Sort",
          typeAll: "All",
          typeRun: "Run",
          typeRide: "Ride",
          typeWalk: "Walk",
          typeOther: "Other",
          dateAll: "All time",
          date7d: "Last 7 days",
          date30d: "Last 30 days",
          sortDateDesc: "Newest",
          sortDateAsc: "Oldest",
          sortDistanceDesc: "Distance ↓",
          sortDistanceAsc: "Distance ↑",
        },
        fields: {
          distance: "Distance",
          duration: "Time",
          date: "Date",
        },
        detail: {
          title: "Activity details",
          back: "Back",
          notFound: "Activity not found",
          edit: "Edit",
          delete: "Delete",
          deleting: "Deleting...",
          pace: "Pace",
          confirm: {
            deleteTitle: "Delete activity?",
            deleteDesc: "This action cannot be undone.",
            deleteConfirm: "Delete",
            deleteCancel: "Cancel",
          },
        },
        edit: {
          title: "Edit activity",
          actions: {
            save: "Save changes",
            saving: "Saving...",
            cancel: "Cancel",
          },
        },
      },
      auth: {
        email: "Email",
        password: "Password",
        login: {
          subtitle: "Welcome back! Sign in to continue.",
          forgot: "Forgot your password?",
          submit: "Sign in",
          noAccount: "Don't have an account?",
          register: "Sign up",
        },
        register: {
          title: "Sign up",
          name: "Name",
          passwordHint: "Min. 8 characters",
          passwordConfirm: "Confirm password",
          haveAccount: "Already have an account?",
          submit: "Create account",
          errors: {
            registerGeneric: "Could not create an account. Check your details and try again.",
            nameRequired: "Name is required",
            nameMin: "Name must be at least 2 characters",
            nameMax: "Name must be at most 255 characters",
            passwordMin: "Password must be at least 8 characters",
            passwordMax: "Password must be at most 255 characters",
            passwordConfirmRequired: "Password confirmation is required",
            passwordsNotMatch: "Passwords do not match",
          },
        },
        reset: {
          titleStep1: "Reset password",
          titleStep2: "Set a new password",
          hintStep1: "Enter your email to receive a 6-digit password reset code.",
          codeSentTo: "Code was sent to:",

          sendCode: "Send code",
          setNewPassword: "Set new password",

          code6: "Code (6 digits)",
          passwordNew: "New password",
          passwordConfirm: "Confirm password",
          passwordHint: "Min. 8 characters",

          errors: {
            sendCodeGeneric: "Could not send the code. Please try again.",
            reset400: "Invalid code. Generate a new one.",
            resetGeneric: "Could not reset password. Please try again.",

            codeRequired: "Code is required",
            codeInvalid: "Code must be 6 digits",

            passwordMin: "Password must be at least 8 characters",
            passwordMax: "Password must be at most 255 characters",
            passwordConfirmRequired: "Password confirmation is required",
            passwordsNotMatch: "Passwords do not match",
          },
        },
        errors: {
          invalidCredentials: "Invalid email or password",
          loginGeneric: "Could not sign in. Please try again.",
          emailRequired: "Email is required",
          emailInvalid: "Enter a valid email address",
          passwordRequired: "Password is required",
        },
      },
    },
  },
} as const;
