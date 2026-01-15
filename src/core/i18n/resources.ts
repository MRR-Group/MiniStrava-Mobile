export const resources = {
  pl: {
    translation: {
      common: {
        back: "Powrót",
        backToLogin: "Powrót do logowania",
        resendCode: "Wyślij kod ponownie",
        loading: "Ładowanie",
        offline: "Tryb offline – zmiany mogą nie zapisać się."
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
          speed: "Śr. prędkość",
        },
        details: {
          email: "E-mail",
          name: "Imię i nazwisko",
          height: "Wzrost",
          weight: "Waga",
          birth: "Data urodzenia",
        },
        language: {
          title: "Język aplikacji",
          options: {
            pl: "Polski",
            en: "Angielski",
          },
        },
        edit: {
          title: "Edytuj profil",
          offline: "Brak internetu – edycja niedostępna",
          fields: {
            firstName: "Imię",
            lastName: "Nazwisko",
          },
          actions: {
            save: "Zapisz",
            cancel: "Anuluj",
          },
          errors: {
            updateFailed: "Nie udało się zapisać profilu.",
            nameRequired: "Imię i nazwisko jest wymagane.",
            nameMin: "Imię i nazwisko musi mieć min. 2 znaki.",
            nameMax: "Imię i nazwisko może mieć maks. 255 znaków.",
            heightInvalid: "Wzrost musi być liczbą (cm).",
            weightInvalid: "Waga musi być liczbą (kg).",
            birthInvalid: "Wybierz poprawną datę urodzenia.",
          },
        },
        export: {
          title: "Eksport danych",
          cta: "Eksportuj CSV",
          success: "Plik CSV zapisany.",
          error: "Nie udało się wyeksportować danych.",
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
        leaderboard: {
          title: "Ranking",
          refresh: "Odśwież",
          you: "Ty",
          yourPosition: "Twoja pozycja: {{pos}}",
          distanceThisWeek: "Ten tydzień",
          empty: "Brak danych do rankingu",
        },
        filters: {
          type: "Typ",
          date: "Zakres dat",
          sort: "Sortuj",
          toggle: {
            show: "Pokaż filtry",
            hide: "Ukryj filtry",
          },
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
          aiSummary: {
            title: "Podsumowanie treningu (AI)",
            cta: "Poproś o podsumowanie",
            loading: "Generuję podsumowanie...",
            premiumRequired: "Funkcja dostępna w planie Premium.",
            error: "Nie udało się wygenerować podsumowania.",
          },
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
        loading: "Loading",
        offline: "Offline mode – changes may not sync."
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
          speed: "Avg speed",
        },
        details: {
          email: "Email",
          name: "Full name",
          height: "Height",
          weight: "Weight",
          birth: "Birth date",
        },
        language: {
          title: "App language",
          options: {
            pl: "Polish",
            en: "English",
          },
        },
        edit: {
          title: "Edit profile",
          offline: "Offline – editing disabled",
          fields: {
            firstName: "First name",
            lastName: "Last name",
          },
          actions: {
            save: "Save",
            cancel: "Cancel",
          },
          errors: {
            updateFailed: "Could not save profile.",
            nameRequired: "Full name is required.",
            nameMin: "Full name must be at least 2 characters.",
            nameMax: "Full name must be at most 255 characters.",
            heightInvalid: "Height must be a number (cm).",
            weightInvalid: "Weight must be a number (kg).",
            birthInvalid: "Choose a valid birth date.",
          },
        },
        export: {
          title: "Export data",
          cta: "Export CSV",
          success: "CSV file saved.",
          error: "Could not export data.",
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
        leaderboard: {
          title: "Leaderboard",
          refresh: "Refresh",
          you: "You",
          yourPosition: "Your position: {{pos}}",
          distanceThisWeek: "This week",
          empty: "No leaderboard data",
        },
        filters: {
          type: "Type",
          date: "Date range",
          sort: "Sort",
          toggle: {
            show: "Show filters",
            hide: "Hide filters",
          },
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
          aiSummary: {
            title: "Workout summary (AI)",
            cta: "Generate summary",
            loading: "Generating summary...",
            premiumRequired: "Feature is available on Premium.",
            error: "Could not generate summary.",
          },
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
