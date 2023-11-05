import Nav from "../components/NavBar";
import Footer from "../components/Footer";

export default function NotFoundPage() {
    return(
        <>
            <Nav />
                <div>
                    
                    <h1 className="text-9xl mt-6 mr-4 font-bold text-right">
                        404 
                    </h1>         
                    <h1 className="text-9xl mt-6 mr-4 font-bold text-right">
                        Página no encontrada
                    </h1>  
                </div>
            <Footer />
        </>
    )
}