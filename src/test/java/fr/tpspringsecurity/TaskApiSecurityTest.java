package fr.tpspringsecurity;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TaskApiSecurityTest {

    @Autowired
    private MockMvc mvc;

    // Ces tests restent valides AVANT ET APRES l'exercice 4.
    @Test
    void lesTachesExigentToujoursUneAuthentification() throws Exception {
        mvc.perform(get("/api/tasks")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/tasks").with(httpBasic("alice", "alice123")))
                .andExpect(status().isOk());
        mvc.perform(get("/api/tasks").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk());
        mvc.perform(get("/api/tasks").with(httpBasic("alice", "erreur")))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void bobPeutDejaLireLesStatistiques() throws Exception {
        mvc.perform(get("/api/admin/stats").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk());
        mvc.perform(get("/api/admin/stats")).andExpect(status().isUnauthorized());
    }

    // Activer ce test seulement APRES avoir termine les TODO de SecurityConfig.
    @Disabled("TODO exercice 4 : ajoutez SecurityFilterChain puis retirez @Disabled.")
    @Test
    void exercice4LAccesPublicEtLesDroitsAdminSontRespectes() throws Exception {
        mvc.perform(get("/api/public/info")).andExpect(status().isOk());
        mvc.perform(get("/api/admin/stats").with(httpBasic("alice", "alice123")))
                .andExpect(status().isForbidden());
        mvc.perform(get("/api/admin/stats").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk());
    }
}
