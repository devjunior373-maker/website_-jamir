export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "O Impacto da Inteligência Artificial no Ensino Secundário",
    excerpt: "Como as novas ferramentas de IA estão a transformar a forma como os alunos pesquisam e aprendem no JAMIR.",
    date: "05 Abr, 2026",
    author: "Prof. Paulo Jorge",
    category: "Inovação",
    image: "https://picsum.photos/seed/blog1/800/500"
  },
  {
    id: 2,
    title: "Vencedores das Olimpíadas de Matemática 2026",
    excerpt: "Nossos alunos conquistaram o pódio regional, demonstrando a excelência do nosso programa de ciências exatas.",
    date: "02 Abr, 2026",
    author: "Dra. Maria Santos",
    category: "Conquistas",
    image: "https://picsum.photos/seed/blog2/800/500"
  },
  {
    id: 3,
    title: "A Importância das Artes no Desenvolvimento Cognitivo",
    excerpt: "Descubra como o nosso workshop de artes visuais ajuda a desenvolver o pensamento crítico dos estudantes.",
    date: "28 Mar, 2026",
    author: "Prof. Ana Costa",
    category: "Educação",
    image: "https://picsum.photos/seed/blog3/800/500"
  },
  {
    id: 4,
    title: "Preparação para Exames Nacionais: Dicas Práticas",
    excerpt: "Um guia completo para os nossos alunos do secundário organizarem o seu tempo de estudo de forma eficiente.",
    date: "20 Mar, 2026",
    author: "Dr. António Silva",
    category: "Dicas",
    image: "https://picsum.photos/seed/blog4/800/500"
  }
];
