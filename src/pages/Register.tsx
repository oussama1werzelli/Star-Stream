
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">إنشاء حساب جديد</CardTitle>
            <CardDescription className="text-gray-400">
              أدخل بياناتك لإنشاء حساب جديد
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm type="register" />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm text-gray-400">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="py-16"></div>
      <Footer />
    </div>
  );
};

export default Register;
