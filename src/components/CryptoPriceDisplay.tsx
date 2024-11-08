import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {

  const { result, loading } = useCryptoStore()
  // const hasResult = useMemo(() => !Object.values(result).includes(''), [result]) //* ESTO SOLO SI tu (resulto es codigo: "")
  const hasResult = useMemo(() => {
    // Verificar que result tenga propiedades y que no sean vacías
    return result && Object.keys(result).length > 0 && !Object.values(result).includes('');// porque GUARDE con "as" y NO con codigo:""
  }, [result]);

  // console.log(result.IMAGEURL) // agregar https etc
  return (
    <div className="result-wrapper">

      {loading ? <Spinner /> : hasResult && (
        <>
          <h2>Cotización</h2>
          <div className="result">
            <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="Imagen de Cryptomoneda"
            />
            <div>
              <p>El precio es de : <span>{result.PRICE}</span></p>
              <p>El precio es de : <span>{result.HIGHDAY}</span></p>
              <p>El precio es de : <span>{result.LOWDAY}</span></p>
              <p>El precio es de : <span>{result.CHANGEPCT24HOUR}</span></p>
              <p>El precio es de : <span>{result.LASTUPDATE}</span></p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
