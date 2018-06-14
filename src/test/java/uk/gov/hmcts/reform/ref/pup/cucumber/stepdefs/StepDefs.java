package uk.gov.hmcts.reform.ref.pup.cucumber.stepdefs;

import uk.gov.hmcts.reform.ref.pup.ReferencedataApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = ReferencedataApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
