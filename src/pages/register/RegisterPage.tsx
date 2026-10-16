import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, Link} from "react-router";
import axios from "axios";

const API_URL = "https://qrcode31kn-api.itstep.click";
const REGISTER_URL = `${API_URL}/api/Account/Register`;

interface IRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    image: FileList;
}

const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isSubmitting},
    } = useForm<IRegisterForm>();

    const onSubmit = async (data: IRegisterForm) => {
        setServerError(null);

        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (data.image?.[0]) {
            formData.append("image", data.image[0]);
        }

        try {
            await axios.post(REGISTER_URL, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            navigate("/login");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setServerError(
                    err.response?.data?.message ??
                    err.response?.data?.title ??
                    "Не вдалося зареєструватися."
                );
            } else {
                setServerError("Щось пішло не так.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center px-4 mt-20">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h1 className="text-center text-2xl font-bold text-gray-800">Реєстрація</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            placeholder="Ім'я"
                            className={inputClass}
                            {...register("firstName", {required: "Вкажіть ім'я"})}
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-500">{errors.firstName.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            placeholder="Прізвище"
                            className={inputClass}
                            {...register("lastName", {required: "Вкажіть прізвище"})}
                        />
                        {errors.lastName && (
                            <p className="text-sm text-red-500">{errors.lastName.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className={inputClass}
                            {...register("email", {
                                required: "Вкажіть email",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Некоректний email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Пароль"
                            className={inputClass}
                            {...register("password", {
                                required: "Вкажіть пароль",
                                minLength: {value: 6, message: "Мінімум 6 символів"},
                            })}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>



                    <div>
                        <label className="mb-1 block text-sm text-gray-600">Фото</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full text-sm"
                            {...register("image", {
                                onChange: e => {
                                    const file = e.target.files?.[0];
                                    setPreview(file ? URL.createObjectURL(file) : null);
                                },
                            })}
                        />
                        {preview && (
                            <img src={preview} alt="preview"
                                 className="mt-3 h-24 w-24 rounded-full object-cover"/>
                        )}
                    </div>

                    {serverError && (
                        <p className="text-center text-sm text-red-500">{serverError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
                    >
                        {isSubmitting ? "Зачекайте..." : "Зареєструватися"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Вже є акаунт?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">Увійти</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;