"use client";

import { useState } from "react";
import { MapPin, Users, Calendar, TreePine, Bird, Cloud, Flower2, Mountain } from "lucide-react";
import api from "../api"; // 

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "customer",
  })
  const [isLoading, setIsLoading] = useState(false)

 const handleInputChange = (e) => {
  const { name, value } = e.target
  setFormData((prev) => ({ ...prev, [name]: value }))
}

const handleSubmit = async (e) => {
  e.preventDefault()
  // resto del código...



    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      // Replace with your actual API endpoint
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("Registration failed")
      }

      const data = await res.json()
      localStorage.setItem("token", data.token)
      onRegister?.(data.user)
    } catch (err) {
      alert("Error registering. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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
          <CardTitle className="text-2xl font-bold text-card-foreground">Registro de Usuario</CardTitle>
          <CardDescription className="text-muted-foreground">
            Únase a nuestra plataforma para gestionar tours, guías y reservas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-card-foreground">
                  Nombre
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-input border-border focus:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-card-foreground">
                  Apellido
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Tu apellido"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-input border-border focus:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-card-foreground">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-input border-border focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-card-foreground">
                Teléfono
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full bg-input border-border focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType" className="text-card-foreground">
                Tipo de Usuario
              </Label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-input border border-border rounded-md focus:ring-ring focus:border-ring"
              >
                <option value="customer">Cliente</option>
                <option value="guide">Guía Turístico</option>
                <option value="operator">Operador de Tours</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-card-foreground">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                className="w-full bg-input border-border focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-card-foreground">
                Confirmar Contraseña
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full bg-input border-border focus:ring-ring"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:animate-bounce-gentle shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Crear Cuenta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              ¿Ya tienes cuenta?{" "}
              <button className="text-primary hover:underline font-medium">Inicia sesión aquí</button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
