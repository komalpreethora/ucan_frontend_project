package ucan_frontend_project;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
//@ComponentScan("src.main.java")
public class WebAppInitialiser{

    public static void main(String[] args) throws Exception{
        SpringApplication.run(WebAppInitialiser.class, args);
    }
}
