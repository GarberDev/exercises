def weekday_name(day_of_week):
    """Return name of weekday.
    
        >>> weekday_name(1)
        'Sunday'
        
        >>> weekday_name(7)
        'Saturday'
        
    For days not between 1 and 7, return None
    
        >>> weekday_name(9)
        >>> weekday_name(0)
    """
    week_days = {1:"Sunday", 2:"Monday", 3:"Tuesday", 4: "Wenesday", 5: "Thursday", 6: "Friday", 7: "Saturday"}
    return week_days[day_of_week]