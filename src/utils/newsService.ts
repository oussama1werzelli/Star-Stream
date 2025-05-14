
import { toast } from "@/components/ui/use-toast";

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  content: string;
  source?: string;
}

// This would be replaced with actual API calls in a production environment
const fetchLatestNews = async (): Promise<NewsItem[]> => {
  try {
    // In a real application, this would be an API call
    // Example: return await fetch('https://api.example.com/news').then(res => res.json());
    
    // For now, we'll generate some mock news with the current date
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0];
    
    return [
      {
        id: "n1",
        title: "نتفليكس تعلن عن مسلسل جديد بعنوان 'الحقيقة المرة'",
        date: today,
        image: "https://media.elcinema.com/uploads/_640x_55d99651b5e453286e5e73e81d41aa95a24e3cd48390bfac7c916d0baf9d80c4.jpg",
        summary: "أعلنت منصة نتفليكس عن مسلسل جديد بعنوان 'الحقيقة المرة' من بطولة نخبة من النجوم العرب.",
        content: "أعلنت منصة نتفليكس اليوم عن إنتاج مسلسل درامي جديد بعنوان 'الحقيقة المرة' من بطولة نخبة من النجوم العرب. المسلسل يتناول قصة صحفية شابة تكشف فسادًا كبيرًا في إحدى المؤسسات الحكومية، مما يعرض حياتها للخطر. ومن المتوقع أن يبدأ عرض المسلسل في النصف الثاني من العام الجاري على المنصة.",
        source: "نتفليكس"
      },
      {
        id: "n2",
        title: "فيلم 'نوفوكين' يحقق إيرادات قياسية في أسبوعه الأول",
        date: yesterday,
        image: "https://media.elcinema.com/uploads/_640x_cf7f705030b0c4f682dd9757bd11f26a0ae667cc08c7932a935f4e14b8fd4e6a.jpg",
        summary: "حقق فيلم 'نوفوكين' إيرادات قياسية في شباك التذاكر العربي خلال أسبوعه الأول من العرض.",
        content: "حقق فيلم 'نوفوكين' إيرادات قياسية في شباك التذاكر العربي خلال أسبوعه الأول من العرض، متجاوزًا توقعات النقاد والمحللين. الفيلم الذي يتناول قصة طبيب أسنان يجد نفسه متورطًا في سلسلة من الأحداث المشوقة، نال استحسان الجمهور والنقاد على حد سواء، وحصل على تقييم 8.5/10 على موقع IMDb العالمي.",
        source: "موقع السينما العربية"
      },
      {
        id: "n3",
        title: "بدء تصوير الجزء الثاني من مسلسل 'هوجان'",
        date: yesterday,
        image: "https://media.elcinema.com/uploads/_640x_e702117202ed8a289758b591c3b57bfeeccc8045e8eb9c1431981da47df67f23.jpg",
        summary: "بدأ فريق عمل مسلسل 'هوجان' تصوير الجزء الثاني من العمل الدرامي الناجح.",
        content: "بدأ فريق عمل مسلسل 'هوجان' تصوير الجزء الثاني من العمل الدرامي الناجح، بعد النجاح الكبير الذي حققه الجزء الأول. وصرح مخرج العمل بأن الجزء الثاني سيكون أكثر إثارة وتشويقًا، مع انضمام نجوم جدد للعمل. ومن المتوقع عرض المسلسل في رمضان المقبل.",
        source: "صحيفة الأخبار اليومية"
      },
      {
        id: "n4",
        title: "عرض فيلم 'فرسان التو' في مهرجان القاهرة السينمائي",
        date: twoDaysAgo,
        image: "https://m.media-amazon.com/images/M/MV5BMGM3ZWZmYTUtNDc0Ny00YWZjLWI5ZGYtNzhjZDE0NjQ4Y2I1XkEyXkFqcGdeQXVyMTU1MTY5NTk@._V1_.jpg",
        summary: "تم اختيار فيلم 'فرسان التو' للمشاركة في المسابقة الرسمية لمهرجان القاهرة السينمائي في دورته القادمة.",
        content: "تم اختيار فيلم 'فرسان التو' للمشاركة في المسابقة الرسمية لمهرجان القاهرة السينمائي في دورته القادمة. الفيلم الذي يروي قصة عائلة مافيا إيطالية أمريكية تم ترشيحه من قبل لجنة التحكيم للمنافسة على جائزة أفضل فيلم. وعبر مخرج الفيلم عن سعادته بهذا الاختيار، مؤكدًا أن المشاركة في المهرجان تعد إضافة مهمة للعمل.",
        source: "مهرجان القاهرة السينمائي"
      },
      {
        id: "n5",
        title: "الإعلان عن موعد عرض فيلم 'عميل الكوبرا'",
        date: twoDaysAgo,
        image: "https://media.elcinema.com/uploads/_640x_cf7f705030b0c4f682dd9757bd11f26a0ae667cc08c7932a935f4e14b8fd4e6a.jpg",
        summary: "أعلنت الشركة المنتجة لفيلم 'عميل الكوبرا' عن موعد طرحه في دور العرض السينمائية.",
        content: "أعلنت الشركة المنتجة لفيلم 'عميل الكوبرا' عن موعد طرحه في دور العرض السينمائية في جميع أنحاء الوطن العربي بدءًا من الشهر المقبل. الفيلم من بطولة نجم مصري شهير، ويتناول قصة ضابط شرطة يتورط في مؤامرة دولية تهدد أمن البلاد. وأكدت الشركة المنتجة أن الفيلم سيتوفر أيضًا للمشاهدة عبر المنصات الرقمية بعد شهرين من عرضه السينمائي.",
        source: "الشركة المنتجة"
      }
    ];
  } catch (error) {
    console.error("Error fetching news:", error);
    toast({
      title: "خطأ في تحميل الأخبار",
      description: "تعذر تحميل أحدث الأخبار، يرجى المحاولة مرة أخرى لاحقًا",
      variant: "destructive"
    });
    return [];
  }
};

// Function to search news by keywords
const searchNews = async (keyword: string): Promise<NewsItem[]> => {
  try {
    const allNews = await fetchLatestNews();
    return allNews.filter(news => 
      news.title.toLowerCase().includes(keyword.toLowerCase()) || 
      news.content.toLowerCase().includes(keyword.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching news:", error);
    return [];
  }
};

// Get news by ID
const getNewsById = async (id: string): Promise<NewsItem | null> => {
  try {
    const allNews = await fetchLatestNews();
    return allNews.find(news => news.id === id) || null;
  } catch (error) {
    console.error("Error getting news by ID:", error);
    return null;
  }
};

export const newsService = {
  fetchLatestNews,
  searchNews,
  getNewsById
};
