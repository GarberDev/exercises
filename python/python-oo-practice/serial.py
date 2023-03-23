"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        """Generate next number starting with start number"""
        self.start = self.next = start

    def __repr__(self):
        """Representation"""
        return f"SerialGenerator: start={self.start} next={self.next}"

    def generate(self):
        """generate next number"""
        self.next += 1
        return self.next

    def reset(self):
        """reset to original number"""
        self.next = self.start