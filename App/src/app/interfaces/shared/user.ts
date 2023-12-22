export interface UserData {
  id: string;
  nome: string;
  ra: string;
  cpf: string;
  email: string;
  perfil: string;
}

export interface NewUserData {
  nome: string;
  ra: string;
  cpf: string;
}

export interface SignupData {
  email: string;
  ra: string;
  codigo: string;
  new_password: string;
}

export interface updatePassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
