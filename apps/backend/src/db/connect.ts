import { sequelize } from "./sequelize";

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conexión a la base de datos exitosa');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('📦 Tablas sincronizadas');
    }
  } catch (error) {
    console.error('🔴 Error al conectar la base de datos:', error);
  }
}