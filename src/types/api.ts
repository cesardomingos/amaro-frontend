export interface ProcessedFile {
  arquivo: string;
  nome: string;
  cpf: string;
  admissao: string;
  ano: string;
  status: 'processado' | 'erro';
  linhas_extraidas?: number;
  erro?: string;
}

export interface ApiResponse {
  message: string;
}

export interface HealthResponse {
  status: string;
} 