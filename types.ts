export type UserRoles = 'admin' | 'registrar' | 'user'

export interface UserSignUpData {
  name: string
  person: 'individual' | 'legal'
  IDN: string
  reasonOfAbsence: string
}