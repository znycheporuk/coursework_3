export type UserRoles = 'notarius' | 'registrar'

export interface UserSignUpData {
  name: string
  person: 'individual' | 'legal'
  IDN: string
  reasonOfAbsence: string
}

export interface SignUpValues {
  username: string
  password: string
  role: UserRoles
}

export interface SignInValues {
  username: string
  password: string
}
