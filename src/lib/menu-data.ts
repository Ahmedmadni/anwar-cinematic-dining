import koshary from "@/assets/dish-koshary.jpg?w=700&quality=72&format=webp";
import tagine from "@/assets/dish-tagine.jpg?w=700&quality=72&format=webp";
import omali from "@/assets/dish-omali.jpg?w=700&quality=72&format=webp";
import mixed from "@/assets/dish-mixed-grill.jpg?w=700&quality=72&format=webp";

export type Dish = {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  tag?: string;
};

export type Category = {
  id: string;
  label: string;
  tagline: string;
  dishes: Dish[];
};

export const CATEGORIES: Category[] = [
  {
    id: "grills",
    label: "المشويات على الفحم",
    tagline: "نار هادئة · توابل بلدي · لحوم طازجة",
    dishes: [
      { id: "g1", name: "مشاوي مشكلة فاخرة", desc: "كباب لحم بلدي · كفتة · ريش · فراخ مشوية", price: 480, img: mixed, tag: "الأكثر طلباً" },
      { id: "g2", name: "كباب حلة بلدي", desc: "لحم بقري مفروم بالتوابل المصرية الأصلية", price: 285, img: mixed },
      { id: "g3", name: "ريش ضأن مشوية", desc: "ريش ضأن صغير متبلة بزيت الزيتون والروزماري", price: 395, img: mixed, tag: "موصى به" },
      { id: "g4", name: "فراخ مشوية بالليمون", desc: "نصف فرخة بلدي متبلة بالليمون والثوم", price: 175, img: mixed },
    ],
  },
  {
    id: "tagines",
    label: "الطواجن البلدي",
    tagline: "تطبخ على نار هادئة في الفخار",
    dishes: [
      { id: "t1", name: "طاجن بامية باللحمة", desc: "بامية بلدي مع لحم ضأن في صلصة الطماطم", price: 185, img: tagine, tag: "بيتي" },
      { id: "t2", name: "طاجن لسان عصفور", desc: "لسان عصفور بشوربة فراخ غنية", price: 145, img: tagine },
      { id: "t3", name: "طاجن فراخ بالفريك", desc: "فراخ بلدي مع فريك على البخار", price: 195, img: tagine },
      { id: "t4", name: "طاجن خضار بالموزة", desc: "موزة ضأن مع خضار موسم في الفخار", price: 220, img: tagine },
    ],
  },
  {
    id: "koshary",
    label: "الكشري والمأكولات الشعبية",
    tagline: "وصفات الجدّات بنكهة المدينة",
    dishes: [
      { id: "k1", name: "كشري المدينة", desc: "أرز · مكرونة · عدس · حمص · بصل مقرمش", price: 65, img: koshary, tag: "تقليدي" },
      { id: "k2", name: "كشري بالكبدة", desc: "كشري المدينة مع كبدة إسكندراني حارة", price: 110, img: koshary },
      { id: "k3", name: "ملوخية بالأرانب", desc: "ملوخية ناعمة مع أرانب مشوية وأرز معمر", price: 230, img: koshary },
      { id: "k4", name: "فول وطعمية صعيدي", desc: "فول مدمس بزيت الكتان · طعمية بلدي", price: 55, img: koshary },
    ],
  },
  {
    id: "desserts",
    label: "الحلويات والمشروبات",
    tagline: "لمسة شرقية تختم التجربة",
    dishes: [
      { id: "d1", name: "أم علي بالمكسرات", desc: "ساخنة بفستق ولوز وقشطة طازجة", price: 95, img: omali, tag: "حلو" },
      { id: "d2", name: "أرز بلبن صعيدي", desc: "أرز بلبن بقرفة وقشطة بلدي", price: 65, img: omali },
      { id: "d3", name: "كنافة بالمانجو", desc: "كنافة ناعمة بقشطة ومانجو صعيدي", price: 110, img: omali },
      { id: "d4", name: "كرك المدينة", desc: "شاي كرك بالهيل والزعفران", price: 35, img: omali },
    ],
  },
];

export const ALL_DISHES = CATEGORIES.flatMap((c) => c.dishes);
export const findDish = (id: string) => ALL_DISHES.find((d) => d.id === id);