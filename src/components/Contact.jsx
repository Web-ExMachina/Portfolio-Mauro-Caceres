import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import keys from "../keys.js";

const Contact = () => {
    const [form, setForm] = useState ({name:'',email:'',message:''})
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef(null);

    // Maneja y guarda la carga de datos del input
    const handleChange = (e) => {       
        setForm({...form, [e.target.name]: e.target.value})
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        emailjs.send(

            keys.VITE_APP_EMAILJS_SERVICE_KEY,
            keys.VITE_APP_EMAILJS_TEMPLATE_KEY,
            {
                from_name: form.name,
                to_name: "Web Ex Machina",
                from_email: form.email,
                to_email: "main.webexmachina@gmail.com",
                message: form.message
            },
            keys.VITE_APP_EMAILJS_PUBLIC_KEY,

        ).then(() => {
            setIsLoading(false);
            setForm({name:"", email: "", message: ""});
            toast.success('Mensaje enviado');

        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
        });
      };

  return <>
  
    <section className="px-4">

        <div className="pb-12 flex flex-col max-w-screen-xl mx-auto items-center sm:items-start">
            <h2 className="mx-auto md:mx-0 font-poppins font-semibold text-[30px] sm:text-[40px] md:text-[33px] lg:text-[40px] xl:text-[50px] text-white leading-[75px] lg:leading-[100px]">
                Mi <span className="text-red-500 red-glow">Contacto</span>
            </h2>

            <p className="text-white font-light text-lg leading-6 max-w-[470px] md:max-w-[550px] text-center md:text-left">
                Visita mis redes o consultame, podemos trabajar en un proyecto juntos.
            </p>

            <div className='text-red-500 space-x-3 pt-10'>
            <a className='cursor-pointer' aria-label="Go to my Github" target="_blank" rel="noopener noreferrer" href="https://github.com/Web-ExMachina">
                <div className="fa-brands fa-github red-glow bg-purple-700/10 text-3xl rounded-full p-4 px-5"></div>
              </a>
              <a className='cursor-pointer' aria-label="Go to my Linkedin" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/mauro-ezequiel-c%C3%A1ceres-4098669b/">
                <div className="fa-brands fa-linkedin red-glow bg-purple-700/10 text-3xl rounded-full p-4 px-5"></div>
              </a>
              {/*
              <a className='cursor-pointer' aria-label="Go to my Whatsapp" target="_blank" rel="noopener noreferrer" href="https://wa.me/+5411XXXXXXXX?text=!Hola¡%20Vi%20tu%20Sitio%20Web%20y%20quiero%20hacerte%20una%20consulta">
                <div className="fa-brands fa-whatsapp red-glow bg-purple-700/10 text-3xl rounded-full p-4 px-5"></div>
              </a>
              */}
              <a className='cursor-pointer' aria-label="Send me an Email" target="_blank" rel="noopener noreferrer" href="mailto:main.webexmachina@gmail.com">
                <div className="fa-regular fa-envelope red-glow bg-purple-700/10 text-3xl rounded-full p-4 px-5"></div>
              </a>
            </div>
        </div>

        <div className="max-w-screen-sm mx-auto font-light text-lg">

            <form 
                className="grid gap-5 mx-auto"
                name="form"
                ref={formRef}
                autoComplete="on"
                onSubmit={handleSubmit}
            >

                <div className="bg-purple-950/10 text-white backdrop-blur-2xl rounded-md p-1">
                    <input
                        className="placeholder-purple-300 border border-purple-500 w-full px-2 rounded-md bg-purple-950/10"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                    />
                </div>

                <div className="bg-purple-950/10 text-white backdrop-blur-2xl rounded-md p-1">
                <input
                        className="placeholder-purple-300 border border-purple-500 w-full px-2 rounded-md bg-purple-950/10"
                        type="email"
                        name="email"
                        placeholder="JohnDoe@ejemplo.com"
                        required
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />
                </div>

                <div className="bg-purple-950/10 text-white backdrop-blur-2xl rounded-md">
                    <div className="border-purple-400 rounded-md pt-1 px-1 -mb-0.5">
                        <textarea
                            className="placeholder-purple-300 border border-purple-500 w-full px-2 rounded-md bg-purple-950/10"
                            rows={3}
                            name="message"
                            placeholder="Escribe tu consulta aquí"
                            required
                            value={form.message}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button className="font-normal neon-button max-w-44 mx-auto backdrop-blur-md my-5 z-96" type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar"}
                </button>

                <Toaster richColors="true" position="top-right"/>
            </form> 
        </div>
    </section>

  </>;
};

export default Contact;
