package com.swe573.living_stories.Services;

import com.swe573.living_stories.Models.Activity;
import com.swe573.living_stories.Models.Story;
import com.swe573.living_stories.Models.User;
import com.swe573.living_stories.Repositories.ActivityRepository;
import com.swe573.living_stories.Repositories.StoryRepository;
import com.swe573.living_stories.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ActivityServiceTest {

    @Mock
    private StoryRepository storyRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ActivityRepository activityRepository;

    @InjectMocks
    private ActivityService activityService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRecordLikeActivity() {
        Long storyId = 1L;
        Long userId = 2L;

        when(userRepository.getReferenceById(userId)).thenReturn(new User());

        when(storyRepository.getReferenceById(storyId)).thenReturn(new Story());

        assertDoesNotThrow(() -> activityService.recordLikeActivity(storyId, userId));

        verify(activityRepository, times(1)).save(any(Activity.class));
    }

    @Test
    void testCheckDuplicateActivity() {
        Long actionItemId = 1L;
        Long userId = 2L;
        String actionType = "L";

        when(userRepository.getReferenceById(userId)).thenReturn(new User());
        when(activityRepository.CheckByUserIdAndStoryId(userId, actionItemId, actionType)).thenReturn(Collections.emptyList());

        assertTrue(activityService.checkDuplicateActivity(actionItemId, userId, actionType));
    }
}
