export const register = async (e,objet) => {
    e.preventDefault()
  try {
    const { name, lastname, email, password } = objet;

    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre : name,
        apellido : lastname,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al registrar usuario");
    }

    return data;
  } catch (error) {
    console.error("Register error:", error.message);
    throw error;
  }
};

export const login = async (e,objet) => {
    e.preventDefault()
  try {
    const { email, password } = objet;

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al logear usuario");
    }

    return data;
  } catch (error) {
    console.error("Register error:", error.message);
    throw error;
  }
};