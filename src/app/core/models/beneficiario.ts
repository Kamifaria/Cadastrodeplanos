export type Status = 'ATIVO' | 'INATIVO';

export interface Beneficiario {
  id: number;
  nome_completo: string;
  cpf: string;
  data_nascimento: string;
  status: Status;
  plano_id: number;
  data_cadastro: string;
}