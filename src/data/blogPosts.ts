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
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=75"
  },
  {
    id: 2,
    title: "Vencedores das Olimpíadas de Matemática 2026",
    excerpt: "Nossos alunos conquistaram o pódio regional, demonstrando a excelência do nosso programa de ciências exatas.",
    date: "02 Abr, 2026",
    author: "Dra. Maria Santos",
    category: "Conquistas",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=75"
  },
  {
    id: 3,
    title: "A Importância das Artes no Desenvolvimento Cognitivo",
    excerpt: "Descubra como o nosso workshop de artes visuais ajuda a desenvolver o pensamento crítico dos estudantes.",
    date: "28 Mar, 2026",
    author: "Prof. Ana Costa",
    category: "Educação",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=75"
  },
  {
    id: 4,
    title: "Preparação para Exames Nacionais: Dicas Práticas",
    excerpt: "Um guia completo para os nossos alunos do secundário organizarem o seu tempo de estudo de forma eficiente.",
    date: "20 Mar, 2026",
    author: "Dr. António Silva",
    category: "Dicas",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=75"
  }
];
