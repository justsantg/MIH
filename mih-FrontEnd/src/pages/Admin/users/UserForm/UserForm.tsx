import React, { useState } from "react";
import "./UserForm.css";

interface UserFormProps {
  onSubmit: (data: { firstName: string; lastName: string; email: string; password: string }) => void;
  onClose: () => void;
  isOpen: boolean;
}


const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Registrar Administrador</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <label>
            Nombre:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </label>

          <label>
            Apellido:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Contraseña:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-delete" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
