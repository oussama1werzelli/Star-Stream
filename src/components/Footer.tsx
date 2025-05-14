
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/90 border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold mr-1">Star</span>
              <span className="text-blue-500 text-xl font-bold">Stream</span>
            </Link>
            <p className="text-gray-400 text-sm mt-2">شاهد أحدث الأفلام والمسلسلات بلا حدود</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">روابط مهمة</h3>
              <ul className="space-y-1">
                <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">من نحن</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">اتصل بنا</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">الشروط والأحكام</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">سياسة الخصوصية</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">الأقسام</h3>
              <ul className="space-y-1">
                <li><Link to="/movies" className="text-gray-400 hover:text-white text-sm">أفلام</Link></li>
                <li><Link to="/series" className="text-gray-400 hover:text-white text-sm">مسلسلات</Link></li>
                <li><Link to="/new" className="text-gray-400 hover:text-white text-sm">أحدث الإضافات</Link></li>
                <li><Link to="/top" className="text-gray-400 hover:text-white text-sm">الأكثر مشاهدة</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">StarStream © {new Date().getFullYear()} - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
