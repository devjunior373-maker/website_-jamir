import React from 'react';
import { motion } from 'motion/react';
import { 
  School, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Escola",
      links: [
        { name: "Sobre Nós", href: "#" },
        { name: "Nossa Missão", href: "#" },
        { name: "Equipa Docente", href: "#" },
        { name: "Carreiras", href: "#" },
        { name: "Notícias", href: "#" }
      ]
    },
    {
      title: "Ensino",
      links: [
        { name: "Ensino Primário", href: "#" },
        { name: "Ensino Secundário", href: "#" },
        { name: "Cursos Técnicos", href: "#" },
        { name: "Atividades Extra", href: "#" },
        { name: "Calendário Escolar", href: "#" }
      ]
    },
    {
      title: "Suporte",
      links: [
        { name: "Secretaria Online", href: "#" },
        { name: "Pagamentos", href: "#" },
        { name: "Documentação", href: "#" },
        { name: "FAQ", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Logo Complexo Jamir" 
                className="h-14 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-2xl leading-none tracking-tight">COMPLEXO JAMIR</span>
              </div>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
              Formando líderes e cidadãos globais através de uma educação de excelência, inovação constante e valores humanos sólidos desde 2012.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-[5px] flex items-center justify-center hover:bg-[#2E7D32] hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((group, index) => (
            <div key={index} className="lg:col-span-2">
              <h4 className="text-white font-bold text-lg mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="hover:text-[#2E7D32] transition-colors flex items-center group"
                    >
                      <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-6">Receba as últimas novidades e eventos diretamente no seu e-mail.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Seu e-mail"
                className="w-full bg-gray-800 border border-gray-700 rounded-[5px] px-4 py-3 text-sm focus:outline-none focus:border-[#2E7D32] transition-colors"
              />
              <button className="w-full bg-[#2E7D32] text-white py-3 rounded-[5px] font-bold text-sm hover:bg-[#1B5E20] transition-colors shadow-lg">
                Subscrever
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
          <p className="text-sm text-gray-500 text-center">
            © {currentYear} COMPLEXO JAMIR. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
