export const setCookie = (res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
        httpOnly:true,// Prevent the XSS attack
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",// Prevent CSRF attacks,cross-site request forgery
        maxAge:15*60*1000 // 15min 
    });
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,// Prevent the XSS attack
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",// Prevent CSRF attacks,cross-site request forgery
        maxAge:7*24*60*60*1000 // 7days 
    })
}





