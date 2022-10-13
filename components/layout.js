import Nav from './nav';

export default function Layout({children}){
    return(
        <div className='mx-6 md:max-w-2xl md:mx-auto font-poppins' >
            {/* mx is for margin x and md is for medium screen and max-width is 2xl and md-mx is auto switching */}
            <Nav/>
            <main>{children}</main>
        </div>
    );
}
 