package com.novo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	// Helps with configuring handlerMapping path matching
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseSuffixPatternMatch(false);
    }

    // Configures simple automated pre-controllers with the response a view
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/laboratori/").setViewName("forward:/laboratori/index.html");
        registry.addViewController("/richiedi-prenotazione/").setViewName("forward:/richiedi-prenotazione/index.html");
        registry.addViewController("/sign-in/").setViewName("forward:/sign-in/index.html");
        registry.addViewController("/privacy/").setViewName("forward:/privacy/index.html");
        registry.addViewController("/dashboard/").setViewName("forward:/dashboard/index.html");
    }
}
