export const predefinedPlans = {
    areas: [
        'Tribunal', 'Bancária', 'Fiscal', 'Juridica', 'Administrativa', 'Policial', 'Militares', 'Educação', 'Saude'
    ],
    cargos: [
        'Analista', 'Tecnico', 'Escrivão', 'Delegado', 'Soldado', 'Professor', 'Médico', 'Enfermeiro'
    ],

    concursos: [
        {
            id: 1,
            name: 'Polícia Civil SP',
            area: 'Policial',
            região: 'São Paulo',
            cargos: ['Delegado', 'Escrivão', 'Investigador'],
            provas: [
                'Conhecimentos Gerais',
                'Conhecimentos Específicos',
                'Teste de Aptidão Física',
                'Avaliação Psicológica'
            ]
        },
        {
            id: 2,
            name: 'Polícia Civil RJ',
            area: 'Policial',
            região: 'Rio de Janeiro',
            cargos: ['Delegado', 'Escrivão', 'Investigador'],
            provas: [
                'Conhecimentos Gerais',
                'Conhecimentos Específicos',
                'Teste de Aptidão Física',
                'Avaliação Psicológica'
            ]
        },

        {
            id: 3,
            name: 'Tribunal de Justiça SP',
            area: 'Tribunal',
            região: 'São Paulo',
            cargos: ['Analista Judiciário', 'Técnico Judiciário'],
            provas: [
                'Língua Portuguesa',
                'Raciocínio Lógico',
                'Noções de Direito',
                'Conhecimentos Específicos'
            ]
        },

        {
            id: 4,
            name: 'Tribunal de Justiça RJ',
            area: 'Tribunal',
            região: 'Rio de Janeiro',
            cargos: ['Analista Judiciário', 'Técnico Judiciário'],
            provas: [
                'Língua Portuguesa',
                'Raciocínio Lógico',
                'Noções de Direito',
                'Conhecimentos Específicos'
            ]
        },

        {
            id: 5,
            name: 'Banco do Brasil',
            area: 'Bancária',
            região: 'Nacional',
            cargos: ['Analista', 'Tecnico'],
            provas: [
                'Língua Portuguesa',
                'Raciocínio Lógico',
                'Conhecimentos Bancários',
                'Conhecimentos Específicos'
            ]
        },

        {
            id: 6,
            name: 'Caixa Econômica Federal',
            area: 'Bancária',
            região: 'Nacional',
            cargos: ['Analista', 'Tecnico'],
            provas: [
                'Língua Portuguesa',
                'Raciocínio Lógico',
                'Conhecimentos Bancários',
                'Conhecimentos Específicos'
            ]
        },

        {
            id: 7,
            name: 'Receita Federal',
            area: 'Fiscal',
            região: 'Nacional',
            cargos: ['Analista Tributário', 'Auditor Fiscal'],
            provas: [
                'Língua Portuguesa',
                'Raciocínio Lógico',
                'Noções de Direito Tributário',
                'Conhecimentos Específicos'
            ]
        },
        {
            id: 8,
            name: 'Tributária Estadual SP',
            area: 'Fiscal',
            região: 'São Paulo',
            cargos: ['Analista Tributário', 'Auditor Fiscal'],
            provas: [
                'Língua Portuguesa',
                'Raciocínio Lógico',
                'Noções de Direito Tributário',
                'Conhecimentos Específicos'
            ]
        },

        {
            id: 9,
            name: 'Detran SP',
            area: 'Administrativa',
            região: 'São Paulo',
            cargos: ['Agente de Trânsito', 'Analista Administrativo'],
            provas: [
                'Língua Portuguesa',
                'Raciocínio Lógico',
                'Noções de Legislação de Trânsito',
                'Conhecimentos Específicos'
            ]
        },

        {
            id: 10,
            name: 'Detran RJ',
            area: 'Administrativa',
            região: 'Rio de Janeiro',
            cargos: ['Agente de Trânsito', 'Analista Administrativo'],
            provas: [
                'Língua Portuguesa',
                'Raciocínio Lógico',
                'Noções de Legislação de Trânsito',
                'Conhecimentos Específicos'
            ]
        }
    ]
};

export const objetivos = [
    'Concurso Público' ,
    'Enem',
    'Vestibular',
    'Residência Médica',
    'OAB',
    'Carreiras Militares',
    'Concurso Interno'
];

export const niveis = [
    'Ensino Médio',
    'Ensino Técnico',
    'Ensino Superior',
];

export const regioes = [
    'Nacional',
    'Norte',
    'Nordeste',
    'Centro-Oeste',
    'Sudeste',
    'Sul'
];

export const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];