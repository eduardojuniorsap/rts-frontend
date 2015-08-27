package com.sap.rts;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.sap.security.um.service.UserManagementAccessor;
import com.sap.security.um.user.PersistenceException;
import com.sap.security.um.user.UnsupportedUserAttributeException;
import com.sap.security.um.user.User;
import com.sap.security.um.user.UserProvider;

/**
 * Servlet implementation class LoggedUserServlet
 */
@WebServlet("/LoggedUserServlet")
public class LoggedUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoggedUserServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		try {

			UserProvider users = UserManagementAccessor.getUserProvider();
			User user = users.getUser(request.getUserPrincipal().getName());
			
			response.setContentType("application/json; charset=UTF-8");
			PrintWriter printout = response.getWriter();

			JSONObject JObject = new JSONObject(); 
			JObject.put("id", request.getRemoteUser()); 
			JObject.put("email", user.getAttribute("email") );
			JObject.put("firstname", user.getAttribute("firstname") );
			JObject.put("lastname", user.getAttribute("lastname") );
			
			String userType = request.getRemoteUser();
			char a_char = userType.charAt(0);
			
			String access_type = "customer";
			
			if (a_char == 'i' || a_char == 'I') {
				access_type = "engineer";
			}
						
			JObject.put("access_type", access_type );

			printout.print(JObject);
			printout.flush();
			
						
		} catch (PersistenceException | UnsupportedUserAttributeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
