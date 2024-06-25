export const Header = (props) => {
  return(
    <div>
      <header className="text-center bg-purple-400 p-8 bg-opacity-50 ">
        <h1 className="text-white text-3xl">{props.tituloPagina}</h1>
      </header>
    </div>
  );
};