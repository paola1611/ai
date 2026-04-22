# 🚀 Desplegar en Producción - Render.com

## Opción 1: Desplegar con Render.com (GRATIS) - Recomendado ⭐

Render.com es la mejor opción gratuita para este MVP. Soporta Node.js, SQLite y mantiene la app activa.

### Paso 1: Preparar el Repositorio

El código ya está en GitHub. Asegúrate de que:
- ✅ El repositorio esté en GitHub (paola1611/ai)
- ✅ El `.env` NO esté commiteado (debe estar en `.gitignore`)
- ✅ Solo `.env.example` debe estar en el repo

Verifica que .gitignore incluya:
```
.env
leads.db
node_modules/
dist/
```

### Paso 2: Crear Cuenta en Render.com

1. Ve a https://render.com
2. Haz clic en "Sign up"
3. Conecta tu cuenta GitHub (elige "GitHub")
4. Autoriza a Render acceder a tu repositorio

### Paso 3: Crear un Nuevo Servicio Web

1. En tu dashboard de Render, haz clic en "New +"
2. Selecciona "Web Service"
3. En "Connect a repository", busca y selecciona `paola1611/ai`
4. Haz clic en "Connect"

### Paso 4: Configurar el Servicio

Completa estos campos:

| Campo | Valor |
|-------|-------|
| **Name** | `ai-lead-classifier` |
| **Environment** | `Node` |
| **Region** | `Ohio` (o la más cercana) |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | `Free` (en la esquina inferior derecha) |

### Paso 5: Agregar Variables de Entorno

1. Desplázate hacia abajo hasta "Environment Variables"
2. Haz clic en "Add Environment Variable"
3. Agrega esta variable:
   - **Key**: `OPENAI_API_KEY` (dejar en blanco o cambiar a "Other" si no usas OpenAI)
   - **Value**: Deja en blanco (Ya no usamos OpenAI, usamos clasificación por keywords)
4. Agrega otra:
   - **Key**: `NODE_ENV`
   - **Value**: `production`

### Paso 6: Desplegar

1. Haz clic en "Create Web Service"
2. Render comenzará a construir y desplegar (toma 2-5 minutos)
3. Verás un URL como: `https://ai-lead-classifier.onrender.com`

### Paso 7: Acceder a tu App

Una vez que la barra de estado sea **verde** (no gris), tu app estará VIVA.

Abre: `https://tu-app-url.onrender.com`

¡Listo! 🎉

---

## Alternativa: Desplegar Frontend + Backend por Separado

Si prefieres, puedes desplegar de forma separada:

### Frontend en Vercel (gratis)

1. Ve a https://vercel.com
2. Conecta GitHub
3. Selecciona el repositorio `paola1611/ai`
4. En "Root Directory", coloca `ai-lead-mvp`
5. En "Build Command", deja `npm run build`
6. Desplega

URL será algo como: `https://ai-lead-mvp.vercel.app`

### Backend en Railway o Render (gratis)

1. Ve a https://railway.app o https://render.com
2. Conecta GitHub
3. Selecciona el repositorio `paola1611/ai`
4. Configura igual que arriba

---

## 🔧 Problemas Comunes y Soluciones

### "Build failed" o "Module not found"

**Causa**: Falta instalar dependencias

**Solución**: 
- Ve al dashboard de Render
- Haz clic en "Redeploy"
- O haz `git push` nuevamente para disparar un rebuild

### "Application crashed" o "cannot find module"

**Causa**: Falta alguna dependencia

**Solución**:
```bash
# En tu local
npm install

# Commit y push
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### "Cannot write to database" o "leads.db error"

**Causa**: SQLite en Render es efímero (se borra cuando se reinicia)

**Solución**: Es normal. Los datos se perderán si Render reinicia la app. Para producción real, migra a PostgreSQL (ver abajo).

### "Free plan is limited"

Render detiene las apps gratuitas después de 15 minutos sin actividad. Cuando alguien accede, se reactiva.

Para producción seria:
- Upgrade a "Starter" ($7/mes)
- O usa PostgreSQL gratuito de Render

---

## 📊 Estadísticas del Plan Gratuito de Render

| Característica | Plan Gratuito |
|---|---|
| Uptime | ~99% (con spin-ups) |
| CPU | 0.5 |
| RAM | 512 MB |
| Almacenamiento | Efímero (se borra al reiniciar) |
| Costo | $0/mes |

---

## ✨ Próximos Pasos (Opcional)

Una vez que esté en producción, puedes:

1. **Cambiar a PostgreSQL** (Render da 90 días gratis)
   - Más confiable que SQLite para producción
   - Los datos persisten

2. **Configurar un dominio personalizado**
   - En Render → Settings → Domains
   - Agrega tu dominio (miapp.com)

3. **Configurar SSL automático**
   - Render lo hace automáticamente

4. **Monitorear logs en tiempo real**
   - En Render → Logs
   - Verás qué está pasando en producción

---

## 🎯 Resumen Rápido

```
1. Confirmar que .env NO está en GitHub
2. Ir a render.com y conectar GitHub
3. Crear Web Service desde el repositorio
4. Configurar Build Command: npm install && npm run build
5. Configurar Start Command: npm start
6. Agregar variables de entorno si es necesario
7. Desplegar (toma 2-5 minutos)
8. ¡Compartir URL con todos!
```

---

## 📱 Compartir con el Mundo

Una vez que esté deployed, comparte el URL:

```
🚀 Mi app está LIVE: https://ai-lead-classifier.onrender.com
¡Pruébala y clasifica leads automáticamente!
```

---

**¿Necesitas ayuda?** 
- Render Docs: https://render.com/docs
- Estado de Render: https://status.render.com
