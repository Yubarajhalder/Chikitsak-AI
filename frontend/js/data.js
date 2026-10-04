/**
 * Chikitsak AI - Frontend Data Definitions
 * Contains comprehensive categories, symptom definitions, and clinical questions.
 */

const SYMPTOM_DATA = {
  // Categories matching the backend
  categories: [
    {
      id: "skin",
      name: "Skin & Dermatological",
      icon: "sparkles",
      description: "Rashes, itching, pimples, discoloration, blisters, and nail changes",
      badge: "17 Symptoms",
      symptoms: [
        "itching",
        "skin_rash",
        "nodal_skin_eruptions",
        "internal_itching",
        "red_spots_over_body",
        "dischromic _patches",
        "pus_filled_pimples",
        "blackheads",
        "scurring",
        "skin_peeling",
        "silver_like_dusting",
        "small_dents_in_nails",
        "inflammatory_nails",
        "blister",
        "red_sore_around_nose",
        "yellow_crust_ooze",
        "bruising"
      ]
    },
    {
      id: "respiratory",
      name: "Respiratory & Breathing",
      icon: "wind",
      description: "Cough, breathlessness, phlegm, sneezing, throat irritation, and congestion",
      badge: "15 Symptoms",
      symptoms: [
        "continuous_sneezing",
        "shivering",
        "chills",
        "cough",
        "breathlessness",
        "phlegm",
        "throat_irritation",
        "patches_in_throat",
        "mucoid_sputum",
        "rusty_sputum",
        "blood_in_sputum",
        "loss_of_smell",
        "sinus_pressure",
        "runny_nose",
        "congestion"
      ]
    },
    {
      id: "fever_infection",
      name: "Fever & General Infection",
      icon: "thermometer",
      description: "High/mild fever, sweating, chills, fatigue, malaise, and swollen lymph nodes",
      badge: "10 Symptoms",
      symptoms: [
        "high_fever",
        "mild_fever",
        "sweating",
        "chills",
        "fatigue",
        "lethargy",
        "malaise",
        "dehydration",
        "toxic_look_(typhos)",
        "swelled_lymph_nodes"
      ]
    },
    {
      id: "neurological",
      name: "Neurological & Sensory",
      icon: "brain",
      description: "Headaches, dizziness, vertigo, balance loss, slurred speech, and confusion",
      badge: "12 Symptoms",
      symptoms: [
        "headache",
        "dizziness",
        "spinning_movements",
        "loss_of_balance",
        "unsteadiness",
        "slurred_speech",
        "altered_sensorium",
        "lack_of_concentration",
        "visual_disturbances",
        "blurred_and_distorted_vision",
        "weakness_of_one_body_side",
        "coma"
      ]
    },
    {
      id: "muscle_joint",
      name: "Musculoskeletal & Joints",
      icon: "activity",
      description: "Joint pain, muscle weakness, cramps, back/neck pain, and walking difficulty",
      badge: "14 Symptoms",
      symptoms: [
        "joint_pain",
        "muscle_wasting",
        "back_pain",
        "neck_pain",
        "knee_pain",
        "hip_joint_pain",
        "muscle_weakness",
        "muscle_pain",
        "stiff_neck",
        "swelling_joints",
        "movement_stiffness",
        "cramps",
        "weakness_in_limbs",
        "painful_walking"
      ]
    },
    {
      id: "digestive",
      name: "Digestive & Gastrointestinal",
      icon: "utensils",
      description: "Stomach pain, acidity, nausea, vomiting, indigestion, constipation, and diarrhea",
      badge: "14 Symptoms",
      symptoms: [
        "stomach_pain",
        "acidity",
        "vomiting",
        "indigestion",
        "nausea",
        "loss_of_appetite",
        "constipation",
        "abdominal_pain",
        "diarrhoea",
        "belly_pain",
        "passage_of_gases",
        "stomach_bleeding",
        "distention_of_abdomen",
        "swelling_of_stomach"
      ]
    },
    {
      id: "urinary",
      name: "Urinary & Renal",
      icon: "droplet",
      description: "Burning urination, bladder discomfort, foul odor, and persistent urge",
      badge: "5 Symptoms",
      symptoms: [
        "burning_micturition",
        "spotting_ urination",
        "bladder_discomfort",
        "foul_smell_of urine",
        "continuous_feel_of_urine"
      ]
    },
    {
      id: "cardiovascular",
      name: "Cardiovascular & Circulation",
      icon: "heart",
      description: "Chest discomfort, rapid heart rate, palpitations, cold limbs, and varicose veins",
      badge: "7 Symptoms",
      symptoms: [
        "chest_pain",
        "fast_heart_rate",
        "palpitations",
        "swollen_legs",
        "swollen_blood_vessels",
        "prominent_veins_on_calf",
        "cold_hands_and_feets"
      ]
    },
    {
      id: "eyes",
      name: "Eye & Vision Health",
      icon: "eye",
      description: "Redness, tearing, pain behind eyes, blurred vision, and sunken eyes",
      badge: "6 Symptoms",
      symptoms: [
        "blurred_and_distorted_vision",
        "redness_of_eyes",
        "watering_from_eyes",
        "visual_disturbances",
        "pain_behind_the_eyes",
        "sunken_eyes"
      ]
    },
    {
      id: "liver_jaundice",
      name: "Liver & Hepatic Health",
      icon: "shield-alert",
      description: "Yellow skin or eyes, dark amber urine, acute liver distress, and fluid retention",
      badge: "7 Symptoms",
      symptoms: [
        "yellowish_skin",
        "dark_urine",
        "yellow_urine",
        "yellowing_of_eyes",
        "acute_liver_failure",
        "fluid_overload",
        "fluid_overload.1"
      ]
    },
    {
      id: "mental_emotional",
      name: "Mental & Emotional Wellbeing",
      icon: "smile",
      description: "Anxiety, mood swings, restlessness, low mood, and irritability",
      badge: "6 Symptoms",
      symptoms: [
        "anxiety",
        "mood_swings",
        "restlessness",
        "depression",
        "irritability",
        "lack_of_concentration"
      ]
    },
    {
      id: "metabolic",
      name: "Metabolic & Endocrine",
      icon: "scale",
      description: "Weight changes, blood sugar fluctuations, excessive hunger, and frequent urination",
      badge: "7 Symptoms",
      symptoms: [
        "weight_gain",
        "weight_loss",
        "obesity",
        "irregular_sugar_level",
        "excessive_hunger",
        "increased_appetite",
        "polyuria"
      ]
    },
    {
      id: "anal_bowel",
      name: "Colorectal & Anal",
      icon: "alert-circle",
      description: "Pain during bowel movements, rectal soreness, bleeding, and anal irritation",
      badge: "4 Symptoms",
      symptoms: [
        "pain_during_bowel_movements",
        "pain_in_anal_region",
        "bloody_stool",
        "irritation_in_anus"
      ]
    },
    {
      id: "thyroid_endocrine",
      name: "Thyroid & Neck",
      icon: "layers",
      description: "Enlarged thyroid swelling at neck base and brittle nails",
      badge: "2 Symptoms",
      symptoms: [
        "enlarged_thyroid",
        "brittle_nails"
      ]
    },
    {
      id: "mouth_oral",
      name: "Oral & Dental Health",
      icon: "message-circle",
      description: "Tongue ulcers, canker sores, dry peeling or tingling lips",
      badge: "2 Symptoms",
      symptoms: [
        "ulcers_on_tongue",
        "drying_and_tingling_lips"
      ]
    },
    {
      id: "swelling_fluid",
      name: "Fluid & Swelling Retention",
      icon: "maximize-2",
      description: "Swollen extremities, puffy eyes and face, generalized edema",
      badge: "6 Symptoms",
      symptoms: [
        "swollen_legs",
        "swollen_blood_vessels",
        "swollen_extremeties",
        "puffy_face_and_eyes",
        "fluid_overload",
        "fluid_overload.1"
      ]
    }
  ],

  // Common Clinical Questions asked to all patients
  commonQuestions: [
    {
      key: "family_history",
      title: "Family Medical History",
      question: "Do you have an immediate family history of similar health conditions?",
      description: "Hereditary predisposition or chronic family medical patterns."
    },
    {
      key: "history_of_alcohol_consumption",
      title: "Alcohol History",
      question: "Do you have a regular or frequent history of alcohol consumption?",
      description: "Important factor for liver, gastrointestinal, and metabolic assessment."
    },
    {
      key: "receiving_blood_transfusion",
      title: "Blood Transfusion",
      question: "Have you ever received a blood or plasma transfusion?",
      description: "Relevant for assessing bloodborne or viral transmission."
    },
    {
      key: "receiving_unsterile_injections",
      title: "Unsterile Needle Exposure",
      question: "Have you been exposed to unsterile needles, injections, or non-clinical piercings?",
      description: "Parenteral risk factor for infectious exposures."
    },
    {
      key: "extra_marital_contacts",
      title: "History of Multiple Sexual Partners",
      question: "Do you have a history of multiple sexual partners or unprotected contact?",
      description: "Confidential risk inquiry for sexually transmitted or systemic conditions."
    },
    {
      key: "abnormal_menstruation",
      title: "Abnormal Menstruation",
      question: "Are you experiencing abnormal, irregular, or unusually painful menstruation?",
      description: "Relevant gynecological and endocrine health indicator."
    }
  ],

  // Complete symptom questions dictionary
  symptomDetails: {
    itching: {
      title: "Skin Itching",
      question: "Do you have persistent skin itching or an urge to scratch?",
      description: "Uncomfortable, irritating sensation creating an urge to scratch the skin."
    },
    skin_rash: {
      title: "Skin Rash",
      question: "Do you notice a visible skin rash, redness, or eruptions?",
      description: "Area of irritated, reddened, or bumpy skin."
    },
    nodal_skin_eruptions: {
      title: "Nodal Skin Eruptions",
      question: "Do you have knot-like, raised lumps or nodules on your skin?",
      description: "Firm or raised skin lesions that feel like small lumps."
    },
    continuous_sneezing: {
      title: "Continuous Sneezing",
      question: "Are you experiencing continuous or frequent sneezing spells?",
      description: "Repetitive involuntary bursts of sneezing."
    },
    shivering: {
      title: "Shivering",
      question: "Do you experience uncontrollable shivering or body shakes?",
      description: "Involuntary muscle twitches and trembling caused by cold or fever."
    },
    chills: {
      title: "Chills",
      question: "Do you feel sudden cold chills despite warm clothing?",
      description: "Sensations of intense cold accompanied by goosebumps."
    },
    joint_pain: {
      title: "Joint Pain",
      question: "Do you have pain, soreness, or aching in your joints?",
      description: "Discomfort or inflammation in elbows, knees, fingers, or wrists."
    },
    stomach_pain: {
      title: "Stomach Pain",
      question: "Do you feel cramps or aching in your upper stomach?",
      description: "Pain or discomfort localized in the stomach area."
    },
    acidity: {
      title: "Acidity / Heartburn",
      question: "Do you suffer from acidity, sour regurgitation, or heartburn?",
      description: "Burning sensation in the chest or sour acid backing into the throat."
    },
    ulcers_on_tongue: {
      title: "Tongue Ulcers",
      question: "Do you have painful sores or ulcers on your tongue or mouth?",
      description: "Small, tender sores inside the mouth or on the tongue surface."
    },
    muscle_wasting: {
      title: "Muscle Loss",
      question: "Have you noticed visible shrinking or wasting of muscle tissue?",
      description: "Gradual reduction in muscle mass and muscle definition."
    },
    vomiting: {
      title: "Vomiting",
      question: "Have you experienced vomiting or throwing up?",
      description: "Involuntary expulsion of stomach contents."
    },
    burning_micturition: {
      title: "Burning Urination",
      question: "Do you feel a burning or stinging pain while urinating?",
      description: "Painful or stinging sensation during urination."
    },
    "spotting_ urination": {
      title: "Urinary Spotting",
      question: "Have you noticed spotting or slight blood droplets in your urine?",
      description: "Occasional drops of blood or pink coloration during urination."
    },
    fatigue: {
      title: "Fatigue & Tiredness",
      question: "Do you feel unusual, persistent physical exhaustion or tiredness?",
      description: "Deep weariness not relieved by normal sleep or rest."
    },
    weight_gain: {
      title: "Unexplained Weight Gain",
      question: "Have you experienced sudden or unexplained weight gain?",
      description: "Noticeable increase in body weight without change in diet."
    },
    anxiety: {
      title: "Anxiety & Worry",
      question: "Are you experiencing persistent nervousness, worry, or anxiety?",
      description: "Heightened apprehension, restlessness, or nervous tension."
    },
    cold_hands_and_feets: {
      title: "Cold Extremities",
      question: "Do your hands and feet feel persistently unusually cold?",
      description: "Circulatory chillness in fingers, toes, and extremities."
    },
    mood_swings: {
      title: "Mood Swings",
      question: "Are you experiencing sudden, unpredictable shifts in mood?",
      description: "Rapid transitions between emotional states."
    },
    weight_loss: {
      title: "Unintended Weight Loss",
      question: "Have you noticed significant weight loss without trying?",
      description: "Drop in body weight without intentional dieting or workouts."
    },
    restlessness: {
      title: "Restlessness",
      question: "Do you feel an inner urge to keep moving or inability to stay still?",
      description: "Agitated inability to sit quietly or relax."
    },
    lethargy: {
      title: "Lethargy & Sluggishness",
      question: "Do you feel sluggish, drowsy, and low on initiative?",
      description: "Severe lack of physical and mental energy."
    },
    patches_in_throat: {
      title: "Throat Patches",
      question: "Do you have visible white or reddish patches in your throat?",
      description: "Discolored spots or exudates seen at the back of the mouth."
    },
    irregular_sugar_level: {
      title: "Fluctuating Blood Sugar",
      question: "Do you have unstable or irregular blood glucose readings?",
      description: "Noticeable swings in blood sugar levels."
    },
    cough: {
      title: "Cough",
      question: "Do you have a persistent dry or productive cough?",
      description: "Repeated reflex action clearing air passages."
    },
    high_fever: {
      title: "High Fever",
      question: "Do you have a high body temperature (over 101°F / 38.3°C)?",
      description: "Elevated core body temperature indicating infection or inflammation."
    },
    sunken_eyes: {
      title: "Sunken Eyes",
      question: "Do your eyes look hollowed, dark, or sunken inward?",
      description: "Noticeable deep-set look around the eye sockets due to dehydration."
    },
    breathlessness: {
      title: "Shortness of Breath",
      question: "Are you experiencing breathlessness or difficulty taking a deep breath?",
      description: "Tightness in chest or labored breathing."
    },
    sweating: {
      title: "Excessive Sweating",
      question: "Are you sweating heavily even without intense physical exertion?",
      description: "Profuse perspiration or night sweats."
    },
    dehydration: {
      title: "Dehydration",
      question: "Do you have extreme thirst, dry lips, and decreased urination?",
      description: "Deficit of fluid balance across body tissues."
    },
    indigestion: {
      title: "Indigestion",
      question: "Do you suffer from indigestion or stomach discomfort after meals?",
      description: "Fullness, bloating, and burning in the upper abdomen."
    },
    headache: {
      title: "Headache",
      question: "Are you suffering from a dull, throbbing, or sharp headache?",
      description: "Pain located in any region of the head or scalp."
    },
    yellowish_skin: {
      title: "Yellowish Skin Tint",
      question: "Has your skin developed an unusual yellow tone or paleness?",
      description: "Jaundice-related pigmentation in the skin tissue."
    },
    dark_urine: {
      title: "Dark Urine",
      question: "Is your urine noticeably dark brown or tea-colored?",
      description: "Dark coloration caused by concentrated bilirubin or hydration issues."
    },
    nausea: {
      title: "Nausea",
      question: "Do you feel a persistent sick sensation or urge to vomit?",
      description: "Unsettled stomach sensation preceding vomiting."
    },
    loss_of_appetite: {
      title: "Loss of Appetite",
      question: "Have you noticed a clear reduction in your hunger and desire to eat?",
      description: "Disinterest in food and reduced caloric intake."
    },
    pain_behind_the_eyes: {
      title: "Pain Behind Eyes",
      question: "Do you experience deep aching or pressure behind your eyes?",
      description: "Retro-orbital pain often exacerbated by eye movement."
    },
    back_pain: {
      title: "Back Pain",
      question: "Do you have persistent ache or stiffness in your back?",
      description: "Pain across the lumbar, thoracic, or upper back muscles."
    },
    constipation: {
      title: "Constipation",
      question: "Are your bowel movements infrequent, hard, or difficult to pass?",
      description: "Infrequent or strained bowel movements."
    },
    abdominal_pain: {
      title: "Abdominal Cramps",
      question: "Do you have crampy or dull pain across your abdomen?",
      description: "Discomfort across mid to lower belly regions."
    },
    diarrhoea: {
      title: "Diarrhea",
      question: "Are you having frequent loose, watery stools?",
      description: "Watery bowel movements occurring multiple times daily."
    },
    mild_fever: {
      title: "Mild / Low-grade Fever",
      question: "Do you have a mild, low-grade temperature (99°F - 100.5°F)?",
      description: "Slight elevation in baseline body warmth."
    },
    yellow_urine: {
      title: "Bright Yellow Urine",
      question: "Is your urine unusually bright or deep yellow in color?",
      description: "Pronounced yellow pigmentation in urine."
    },
    yellowing_of_eyes: {
      title: "Yellow Whites of Eyes",
      question: "Are the whites of your eyes (sclera) visibly yellow?",
      description: "Ocular icterus, a classic clinical indicator of jaundice."
    },
    acute_liver_failure: {
      title: "Severe Liver Discomfort",
      question: "Do you have acute right-upper abdomen pain with intense jaundice?",
      description: "Significant hepatic distress signs."
    },
    fluid_overload: {
      title: "Fluid Retention",
      question: "Are you noticing swelling and tightness from fluid buildup?",
      description: "Edema and fluid retention in tissues."
    },
    swelling_of_stomach: {
      title: "Swelling of Stomach",
      question: "Is your stomach visibly bloated, distended, or tight?",
      description: "Firm swelling or enlargement of the stomach wall."
    },
    swelled_lymph_nodes: {
      title: "Swollen Lymph Nodes",
      question: "Can you feel tender, enlarged glands in your neck, armpits, or groin?",
      description: "Enlarged immune nodes responding to infection."
    },
    malaise: {
      title: "General Malaise",
      question: "Do you feel an overall generalized discomfort or unwellness?",
      description: "A vague, diffuse sense of bodily illness."
    },
    blurred_and_distorted_vision: {
      title: "Blurred Vision",
      question: "Is your vision hazy, blurry, or somewhat distorted?",
      description: "Lack of visual sharpness or optical distortion."
    },
    phlegm: {
      title: "Phlegm Production",
      question: "Are you coughing up thick mucus or phlegm from your chest?",
      description: "Respiratory mucus expelled through coughing."
    },
    throat_irritation: {
      title: "Throat Irritation",
      question: "Do you have a scratchy, tickling, or irritated throat?",
      description: "Friction and dryness sensation in the pharynx."
    },
    redness_of_eyes: {
      title: "Red or Bloodshot Eyes",
      question: "Are your eyes red, bloodshot, or noticeably inflamed?",
      description: "Dilation of fine ocular blood vessels."
    },
    sinus_pressure: {
      title: "Sinus Congestion & Pressure",
      question: "Do you feel fullness or aching pressure around your forehead and cheeks?",
      description: "Congestion and pressure behind the facial sinuses."
    },
    runny_nose: {
      title: "Runny Nose",
      question: "Do you have watery discharge running from your nose?",
      description: "Excess nasal drainage (rhinorrhea)."
    },
    congestion: {
      title: "Nasal Congestion",
      question: "Is your nose blocked or stuffy, making breathing through it difficult?",
      description: "Inflamed nasal passages restricting airflow."
    },
    chest_pain: {
      title: "Chest Discomfort",
      question: "Do you experience pain, pressure, or tightness in your chest?",
      description: "Thoracic discomfort that requires careful monitoring."
    },
    weakness_in_limbs: {
      title: "Limb Weakness",
      question: "Do your arms or legs feel weak, heavy, or difficult to lift?",
      description: "Reduced muscular power in arms or legs."
    },
    fast_heart_rate: {
      title: "Rapid Heartbeat",
      question: "Does your heart feel like it is racing or beating too rapidly?",
      description: "Elevated resting pulse or tachycardia."
    },
    pain_during_bowel_movements: {
      title: "Pain During Bowel Movements",
      question: "Do you experience sharp or burning pain when passing stool?",
      description: "Discomfort during evacuation."
    },
    pain_in_anal_region: {
      title: "Anal Discomfort",
      question: "Do you feel persistent aching or irritation in the rectal area?",
      description: "Perianal soreness or discomfort."
    },
    bloody_stool: {
      title: "Blood in Stool",
      question: "Have you noticed bright red blood or dark tarry stool?",
      description: "Evidence of gastrointestinal bleeding."
    },
    irritation_in_anus: {
      title: "Anal Itching & Irritation",
      question: "Do you have itching or burning around the anal opening?",
      description: "Pruritus and localized irritation."
    },
    neck_pain: {
      title: "Neck Soreness",
      question: "Do you experience pain or tenderness when moving your neck?",
      description: "Cervical spine or muscle stiffness."
    },
    dizziness: {
      title: "Dizziness / Lightheadedness",
      question: "Do you feel lightheaded, ungrounded, or faint?",
      description: "Sensation of unsteadiness and potential fainting."
    },
    cramps: {
      title: "Muscle Cramps",
      question: "Do you experience sudden, painful muscle contractions or cramps?",
      description: "Involuntary, painful muscle spasms."
    },
    bruising: {
      title: "Easy Bruising",
      question: "Do you bruise very easily or notice unexplained purple marks?",
      description: "Subcutaneous bleeding without significant injury."
    },
    obesity: {
      title: "Excess Body Weight",
      question: "Are you classified as obese or carrying significant excess weight?",
      description: "Body mass index in the clinical obesity range."
    },
    swollen_legs: {
      title: "Swollen Legs / Ankles",
      question: "Are your lower legs, ankles, or feet noticeably puffy or swollen?",
      description: "Dependent fluid accumulation in the lower limbs."
    },
    swollen_blood_vessels: {
      title: "Swollen Blood Vessels",
      question: "Do you have engorged, bulging, or inflamed veins under the skin?",
      description: "Distended or inflamed superficial veins."
    },
    puffy_face_and_eyes: {
      title: "Facial Puffiness",
      question: "Do you wake up with puffy eyes or swelling around your face?",
      description: "Fluid collection around facial tissues and eyelids."
    },
    enlarged_thyroid: {
      title: "Swollen Neck / Thyroid",
      question: "Do you have visible fullness or swelling at the base of your neck?",
      description: "Goiter or enlargement of the thyroid gland."
    },
    brittle_nails: {
      title: "Brittle Nails",
      question: "Are your fingernails fragile, peeling, or cracking easily?",
      description: "Weak, easily broken keratin nail plates."
    },
    swollen_extremeties: {
      title: "Swollen Hands / Feet",
      question: "Do your hands, fingers, or feet feel tight and swollen?",
      description: "Peripheral edema affecting extremities."
    },
    excessive_hunger: {
      title: "Excessive Hunger",
      question: "Do you experience insatiable, constant hunger even after meals?",
      description: "Persistent intense appetite (polyphagia)."
    },
    extra_marital_contacts: {
      title: "History of Multiple Sexual Partners",
      question: "Do you have a history of multiple sexual partners or unprotected contact?",
      description: "Confidential risk inquiry for sexually transmitted or systemic conditions."
    },
    drying_and_tingling_lips: {
      title: "Dry / Tingling Lips",
      question: "Are your lips unusually dry, cracked, or tingling?",
      description: "Cheilitis or sensory irritation around lips."
    },
    slurred_speech: {
      title: "Slurred Speech",
      question: "Have you noticed difficulty articulating words or slurred speech?",
      description: "Impaired verbal articulation."
    },
    knee_pain: {
      title: "Knee Pain",
      question: "Do you have pain, stiffness, or soreness in your knees?",
      description: "Discomfort localized to the knee joint."
    },
    hip_joint_pain: {
      title: "Hip Pain",
      question: "Do you feel pain or stiffness in your hip joints when moving?",
      description: "Discomfort deep within the hip joint area."
    },
    muscle_weakness: {
      title: "Muscle Weakness",
      question: "Do your muscles feel noticeably weak when doing daily tasks?",
      description: "Diminished muscular power."
    },
    stiff_neck: {
      title: "Stiff Neck",
      question: "Is your neck stiff, making it difficult to touch chin to chest?",
      description: "Marked rigidity of cervical musculature."
    },
    swelling_joints: {
      title: "Swollen Joints",
      question: "Are your joints visibly swollen, warm, or tender to touch?",
      description: "Effusion or inflammatory swelling in joints."
    },
    movement_stiffness: {
      title: "Movement Stiffness",
      question: "Do you feel general stiffness in your body, especially in mornings?",
      description: "Slowness and restriction in joint movement."
    },
    spinning_movements: {
      title: "Vertigo / Spinning Sensation",
      question: "Do you experience an illusion that the room is spinning around you?",
      description: "True vestibular vertigo or rotational sensation."
    },
    loss_of_balance: {
      title: "Balance Problems",
      question: "Do you struggle with balance or feel unsteady while walking?",
      description: "Equilibrium impairment."
    },
    unsteadiness: {
      title: "General Unsteadiness",
      question: "Do you feel wobbly or off-balance on your feet?",
      description: "Postural instability."
    },
    weakness_of_one_body_side: {
      title: "One-sided Body Weakness",
      question: "Do you have weakness affecting only one side of your body (hemiparesis)?",
      description: "Asymmetric motor weakness."
    },
    loss_of_smell: {
      title: "Loss of Smell",
      question: "Have you lost your sense of smell or noticed it is severely dulled?",
      description: "Anosmia or olfactory reduction."
    },
    bladder_discomfort: {
      title: "Bladder Pressure & Discomfort",
      question: "Do you feel pressure or soreness in your lower pelvic bladder area?",
      description: "Hypogastric or bladder tenderness."
    },
    "foul_smell_of urine": {
      title: "Foul-Smelling Urine",
      question: "Does your urine have an unusually strong, sharp, or foul odor?",
      description: "Malodorous urine indicating bacterial growth or metabolic byproduct."
    },
    continuous_feel_of_urine: {
      title: "Constant Urge to Urinate",
      question: "Do you have a continuous urge to urinate even after emptying your bladder?",
      description: "Tenesmus or persistent urinary urgency."
    },
    passage_of_gases: {
      title: "Excessive Gas / Flatulence",
      question: "Are you experiencing frequent passing of gas or intestinal bloating?",
      description: "Excessive gastrointestinal gas release."
    },
    internal_itching: {
      title: "Internal Itching",
      question: "Do you feel an irritating itching sensation deep under your skin?",
      description: "Pruritus perceived beneath superficial dermal layers."
    },
    "toxic_look_(typhos)": {
      title: "Severely Sick / Toxic Appearance",
      question: "Do you appear visibly flushed, glassy-eyed, or severely ill?",
      description: "Clinical appearance characteristic of severe systemic infection."
    },
    depression: {
      title: "Low Mood / Depression",
      question: "Have you felt persistently down, hopeless, or lost interest in life?",
      description: "Protracted depressive symptoms and low emotional vitality."
    },
    irritability: {
      title: "Irritability",
      question: "Are you unusually easily annoyed, short-tempered, or agitated?",
      description: "Heightened emotional reactivity to minor stressors."
    },
    muscle_pain: {
      title: "Muscle Aches",
      question: "Do you have widespread muscle soreness or body aches?",
      description: "Myalgia across body muscle groups."
    },
    altered_sensorium: {
      title: "Confusion / Disorientation",
      question: "Are you experiencing mental confusion, disorientation, or cloudy thinking?",
      description: "Altered state of cognitive consciousness."
    },
    red_spots_over_body: {
      title: "Red Spots on Skin",
      question: "Have small red dots or petechial spots appeared across your skin?",
      description: "Tiny pinpoint red macules or purpura."
    },
    belly_pain: {
      title: "Belly Pain",
      question: "Do you feel acute pain or soreness in your lower abdomen?",
      description: "Localized pelvic or lower abdominal pain."
    },
    abnormal_menstruation: {
      title: "Abnormal Menstruation",
      question: "Are you experiencing irregular, unusually heavy, or painful periods?",
      description: "Disruption of normal menstrual cycle parameters."
    },
    "dischromic _patches": {
      title: "Discolored Skin Patches",
      question: "Do you have patches of lightened or discolored skin on your body?",
      description: "Hypopigmented or uneven skin tone areas."
    },
    watering_from_eyes: {
      title: "Watery Eyes",
      question: "Are your eyes constantly tearing up or overflowing with moisture?",
      description: "Epiphora or excessive lacrimation."
    },
    increased_appetite: {
      title: "Increased Appetite",
      question: "Do you have a substantially stronger appetite than usual?",
      description: "Consistent increase in food cravings."
    },
    polyuria: {
      title: "Excessive Urination",
      question: "Are you passing unusually large amounts of urine frequently throughout day and night?",
      description: "High-volume urination (polyuria)."
    },
    family_history: {
      title: "Family Medical History",
      question: "Is there a known history of chronic or hereditary conditions in your immediate family?",
      description: "Familial predisposition to similar health disorders."
    },
    mucoid_sputum: {
      title: "Clear / Mucoid Sputum",
      question: "Are you coughing up clear, thick, or grayish mucus?",
      description: "Mucoid respiratory secretions."
    },
    rusty_sputum: {
      title: "Rust-Colored Sputum",
      question: "Is the mucus you cough up rusty, brownish, or dark-tinted?",
      description: "Blood-tinged oxidized sputum."
    },
    lack_of_concentration: {
      title: "Difficulty Concentrating",
      question: "Do you find it unusually hard to focus or sustain attention?",
      description: "Attentional deficit or mental fatigue."
    },
    visual_disturbances: {
      title: "Visual Disturbances",
      question: "Do you see flashing lights, blind spots, or floaters in your field of view?",
      description: "Transient sensory visual artifacts."
    },
    receiving_blood_transfusion: {
      title: "Blood Transfusion History",
      question: "Have you ever received a blood or plasma transfusion?",
      description: "Exposure history relevant to bloodborne pathogens."
    },
    receiving_unsterile_injections: {
      title: "Unsterile Needle Exposure",
      question: "Have you been exposed to unsterile needles, injections, or non-clinical piercings?",
      description: "Potential parenteral exposure vector."
    },
    coma: {
      title: "Loss of Consciousness",
      question: "Have you experienced blackouts, fainting spells, or loss of responsiveness?",
      description: "Severe alteration in neurological responsiveness."
    },
    stomach_bleeding: {
      title: "Gastrointestinal Bleeding",
      question: "Have you noticed signs of bleeding such as vomiting coffee-ground material?",
      description: "Upper GI hemorrhage signs."
    },
    distention_of_abdomen: {
      title: "Abdominal Distension",
      question: "Does your abdomen appear visibly stretched out or bloated tight?",
      description: "Enlargement of belly circumference."
    },
    history_of_alcohol_consumption: {
      title: "Alcohol History",
      question: "Do you have a history of regular or heavy alcohol consumption?",
      description: "Habitual alcohol intake impacting liver and metabolic health."
    },
    "fluid_overload.1": {
      title: "Severe Fluid Overload",
      question: "Are you experiencing severe, widespread fluid retention in body tissues?",
      description: "Systemic anasarca or profound edema."
    },
    blood_in_sputum: {
      title: "Blood in Cough (Hemoptysis)",
      question: "Have you coughed up streaks of bright red blood or pink froth?",
      description: "Presence of blood in respiratory mucus."
    },
    prominent_veins_on_calf: {
      title: "Varicose Veins on Calves",
      question: "Do you have visible, bulging, or tortuous veins along your lower legs or calves?",
      description: "Venous insufficiency in lower leg vasculature."
    },
    palpitations: {
      title: "Heart Palpitations",
      question: "Do you feel your heart pounding, fluttering, or skipping beats in your chest?",
      description: "Conscious awareness of irregular or strong heartbeat."
    },
    painful_walking: {
      title: "Pain When Walking",
      question: "Does walking or putting weight on your legs cause significant pain?",
      description: "Gait impairment due to pain."
    },
    pus_filled_pimples: {
      title: "Pus-Filled Pimples",
      question: "Do you have pustules, yellow-tipped pimples, or boil-like eruptions?",
      description: "Inflammatory acneiform pustules."
    },
    blackheads: {
      title: "Blackheads",
      question: "Do you have visible blackheads or clogged pore bumps on your skin?",
      description: "Open comedones resulting from oxidized sebum."
    },
    scurring: {
      title: "Skin Scabbing / Scarring",
      question: "Do you have crusty scabs or healing scars on your skin lesions?",
      description: "Crust or cicatrix formation on skin."
    },
    skin_peeling: {
      title: "Peeling Skin",
      question: "Is your skin shedding or peeling away in sheets or flakes?",
      description: "Desquamation of the outer epidermis."
    },
    silver_like_dusting: {
      title: "Silvery Flakes on Skin",
      question: "Does your skin lesion produce silvery, mica-like dry flakes?",
      description: "Plaque scaling typical of psoriatic lesions."
    },
    small_dents_in_nails: {
      title: "Pitted / Dented Nails",
      question: "Do you notice small pinpoint dents, pits, or depressions across your nails?",
      description: "Nail plate pitting associated with dermatologic disorders."
    },
    inflammatory_nails: {
      title: "Inflamed Nail Beds",
      question: "Are your nail beds tender, red, or swollen around the cuticles?",
      description: "Paronychia or periungual erythema."
    },
    blister: {
      title: "Fluid-Filled Blisters",
      question: "Have fluid-filled blisters or bubbles formed on your skin?",
      description: "Vesicles or bullae filled with clear fluid."
    },
    red_sore_around_nose: {
      title: "Sores Around Nose / Mouth",
      question: "Do you have red, inflamed sores clustered around your nose or lips?",
      description: "Erythematous facial lesions."
    },
    yellow_crust_ooze: {
      title: "Honey-Colored Crusted Ooze",
      question: "Do your skin sores ooze fluid that hardens into yellow, honey-colored crusts?",
      description: "Impetigo-like golden honey crusting."
    }
  }
};
