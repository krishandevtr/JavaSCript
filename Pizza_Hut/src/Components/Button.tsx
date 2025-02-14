const Button = ({ title }:{title:string}) => {
    return (
      <button className=" text-black bg-yellow-400 font-semibold px-5 py-2 rounded-md hover:bg-yellow-300 transition duration-200 ease-linear">
        {title}
      </button>
    );
  };
  
  export default Button;