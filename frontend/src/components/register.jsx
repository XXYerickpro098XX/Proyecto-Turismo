"use client";

import { useState } from "react";
import { MapPin, Users, Calendar, TreePine, Bird, Cloud, Flower2, Mountain } from "lucide-react";
import api from "../api";

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "customer", // lo usaremos como rol
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      // Mapeo a lo que espera el backend
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: formData.userType === "customer" ? "user" : formData.userType,
      };

      const res = await api.post("/auth/register", payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onRegister?.(res.data.user);
    } catch (err) {
      alert(err.response?.data?.message || "Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-emerald-50 to-blue-100">
        {/* Floating clouds */}
        <div className="absolute top-10 left-10 text-sky-300 animate-float">
          <Cloud className="h-16 w-16 opacity-60" />
        </div>
        <div className="absolute top-20 right-20 text-sky-200 animate-float" style={{ animationDelay: "2s" }}>
          <Cloud className="h-12 w-12 opacity-40" />
        </div>
        <div className="absolute top-32 left-1/3 text-sky-300 animate-float" style={{ animationDelay: "4s" }}>
          <Cloud className="h-20 w-20 opacity-50" />
        </div>

        {/* Swaying trees */}
        <div className="absolute bottom-0 left-16 text-emerald-600 animate-sway">
          <TreePine className="h-24 w-24 opacity-70" />
        </div>
        <div className="absolute bottom-0 right-16 text-emerald-700 animate-sway" style={{ animationDelay: "1s" }}>
          <TreePine className="h-20 w-20 opacity-60" />
        </div>
        <div className="absolute bottom-0 left-1/4 text-emerald-500 animate-sway" style={{ animationDelay: "3s" }}>
          <TreePine className="h-28 w-28 opacity-50" />
        </div>

        {/* Flying birds */}
        <div className="absolute top-1/4 text-gray-600 animate-fly">
          <Bird className="h-6 w-6 opacity-70" />
        </div>
        <div className="absolute top-1/3 text-gray-500 animate-fly" style={{ animationDelay: "8s" }}>
          <Bird className="h-5 w-5 opacity-60" />
        </div>

        {/* Mountain silhouettes */}
        <div className="absolute bottom-0 left-0 text-slate-400 opacity-30">
          <Mountain className="h-32 w-32" />
        </div>
        <div className="absolute bottom-0 right-0 text-slate-500 opacity-25">
          <Mountain className="h-40 w-40" />
        </div>

        {/* Floating flowers */}
        <div className="absolute bottom-20 right-1/4 text-pink-400 animate-float" style={{ animationDelay: "1.5s" }}>
          <Flower2 className="h-8 w-8 opacity-60" />
        </div>
        <div className="absolute bottom-32 left-1/3 text-yellow-400 animate-float" style={{ animationDelay: "3.5s" }}>
          <Flower2 className="h-6 w-6 opacity-50" />
        </div>
      </div>

<Card className="w-full max-w-md relative z-10 bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl animate-fade-in-up">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center space-x-2 text-primary">
            <MapPin className="h-6 w-6" />
            <Users className="h-6 w-6" />
            <Calendar className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground">
            Registro de Usuario
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Únase a nuestra plataforma para gestionar tours, guías y reservas
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre y Apellido */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Correo */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Teléfono (no lo guarda backend, pero lo dejamos visible) */}
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            {/* Tipo de Usuario */}
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuario</Label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              >
                <option value="customer">Cliente</option>
                <option value="guide">Guía Turístico</option>
                <option value="admin">Operador/Admin</option>
              </select>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Registrando..." : "Crear Cuenta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}