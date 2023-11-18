export interface UserData {
  id: string;
  nome: string;
  ra: string;
  cpf: string;
  email: string;
  perfil: string;
}

export interface updatePassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}
