Flera funktioner har använts för  att hantera användarregistrering, inloggning, bokningar och menyhantering. Genom att använda olika tekniker säkerställs att användardata hanteras på ett säkert och effektivt sätt.

Hashing och sanering av lösenord
För att skydda användarnas lösenord lagras de aldrig i klartext i databasen. Istället använders bcrypt för att hash lösenorden. Detta innebär att lösenordet omvandlas till en sträng av tecken som inte kan återföras till det ursprungliga lösenordet, vilket skyddar användarnas lösenord om någon skulle få obehörig tillgång till databasen. Vid registrering och inloggning saneras också all användarinmatning för att förhindra skadlig kod och XSS-attacker.

Användning av JWT-autentisering
För att skydda känsliga områden av webbplatsen, som adminsidan, används JWT (JSON Web Token). När en användare loggar in, genereras en JWT-token som skickas tillbaka till klienten. Denna token används sedan för att verifiera användarens identitet vid efterföljande förfrågningar till servern. Detta säkerställer att endast autentiserade användare kan få tillgång till skyddade endpoints.

https://backend-baserad-webbutveckling-moment-5.onrender.com/

Registrering och login
Metod       Ändpunkt        Beskrivning
POST	    /api/register	Registrerar en ny användare. Kräver användarnamn, e-post och lösenord.
POST	    /api/login	    Loggar in en användare och returnerar en JWT. Kräver användarnamn och lösenord.

Bokningar
Metod	    Ändpunkt	    Beskrivning
GET	        /api/bookings	Hämtar alla bokningar. Kräver JWT för autentisering.
GET	        /api/bookings/  Hämtar en specifik bokning. Kräver JWT för autentisering.
POST	    /api/bookings	Skapar en ny bokning. Kräver inga behörigheter.
PUT	        /api/bookings/  Uppdaterar en specifik bokning. Kräver JWT för autentisering.
DELETE	    /api/bookings/  Raderar en specifik bokning. Kräver JWT för autentisering.

Menyhantering
Metod	    Ändpunkt	    Beskrivning
GET	        /api/menu	    Hämtar alla menyposter.
GET	        /api/menu/      Hämtar en specifik menypost.
POST	    /api/menu	    Skapar en ny menypost. Kräver JWT för autentisering.
PUT	        /api/menu/      Uppdaterar en specifik menypost. Kräver JWT för autentisering.
DELETE	    /api/menu/      Raderar en specifik menypost. Kräver JWT för autentisering.