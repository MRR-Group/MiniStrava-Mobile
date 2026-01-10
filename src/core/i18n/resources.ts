export const resources = {
  pl: {
    translation: {
      common: {
        back: "Powrót",
        backToLogin: "Powrót do logowania",
        resendCode: "Wyślij kod ponownie",
        loading: "Ładowanie"
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
